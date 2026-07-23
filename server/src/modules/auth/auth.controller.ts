import { compare, hash } from 'bcryptjs'
import type { CookieOptions, Response } from 'express'
import { OAuth2Client } from 'google-auth-library'
import { USER_ROLE_VALUES } from '../../constants/role.js'
import { UserModel, type UserDocument, type UserRole } from '../users/user.model.js'
import { ApiError } from '../../utils/api-error.js'
import { ApiResponse } from '../../utils/api-response.js'
import { asyncHandler } from '../../utils/async-handler.js'
import { emailRegex, saltRounds } from '../../constants/auth.js'


type RegisterUserBody = {
  fullName?: unknown
  email?: unknown
  password?: unknown
  confirmPassword?: unknown
  role?: unknown
}

type LoginUserBody = {
  email?: unknown
  password?: unknown
}

type GoogleProfile = {
  googleId: string
  email: string
  fullName: string
}

type GoogleAuthResult = {
  user: UserDocument
  isNewUser: boolean
}

const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
}

const isValidUserRole = (role: unknown): role is UserRole => {
  return typeof role === 'string' && USER_ROLE_VALUES.includes(role as UserRole)
}

const getRequiredEnv = (envKey: string): string => {
  const value = process.env[envKey]

  if (!value) {
    throw new ApiError(500, `${envKey} is not defined`)
  }

  return value
}

const getGoogleOAuthClient = () => {
  return new OAuth2Client(
    getRequiredEnv('GOOGLE_CLIENT_ID'),
    getRequiredEnv('GOOGLE_CLIENT_SECRET'),
    getRequiredEnv('GOOGLE_REDIRECT_URI'),
  )
}

const getClientUrl = () => process.env.CLIENT_URL || 'http://localhost:3000'

const getPublicUser = (user: UserDocument) => ({
  id: user.id,
  fullName: user.fullName,
  email: user.email,
  role: user.role,
  authProviders: user.authProviders,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
})

const sendAuthResponse = (res: Response, statusCode: number, user: UserDocument, message: string) => {
  const accessToken = user.generateAccessToken()
  const refreshToken = user.generateRefreshToken()

  res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions)
  res.status(statusCode).json(
    new ApiResponse(
      statusCode,
      {
        user: getPublicUser(user),
        accessToken,
      },
      message,
    ),
  )
}

const setRefreshTokenCookie = (res: Response, user: UserDocument) => {
  const refreshToken = user.generateRefreshToken()

  res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions)
}

const redirectToClientAuthCallback = (res: Response, user: UserDocument, isNewUser: boolean) => {
  const accessToken = user.generateAccessToken()
  const callbackUrl = new URL('/auth/callback', getClientUrl())

  setRefreshTokenCookie(res, user)
  res.redirect(
    `${callbackUrl.toString()}#accessToken=${encodeURIComponent(accessToken)}&isNewUser=${String(isNewUser)}`,
  )
}

const findOrCreateGoogleUser = async ({ googleId, email, fullName }: GoogleProfile): Promise<GoogleAuthResult> => {
  const existingUser = await UserModel.findOne({
    $or: [{ googleId }, { email }],
  })

  if (existingUser) {
    if (!existingUser.googleId) {
      existingUser.googleId = googleId
    }

    if (!existingUser.authProviders.includes('google')) {
      existingUser.authProviders.push('google')
    }

    if (existingUser.isModified()) {
      await existingUser.save()
    }

    return {
      user: existingUser,
      isNewUser: false,
    }
  }

  const user = await UserModel.create({
    fullName,
    email,
    googleId,
    authProviders: ['google'],
  })

  return {
    user,
    isNewUser: true,
  }
}

export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, confirmPassword, role } = req.body as RegisterUserBody

  if (typeof fullName !== 'string' || !fullName.trim()) {
    throw new ApiError(400, 'Full name is required')
  }

  if (typeof email !== 'string' || !email.trim()) {
    throw new ApiError(400, 'Email is required')
  }

  if (!emailRegex.test(email.trim())) {
    throw new ApiError(400, 'Please enter a valid email address')
  }

  if (typeof password !== 'string' || !password) {
    throw new ApiError(400, 'Password is required')
  }

  if (password.length < 8) {
    throw new ApiError(400, 'Password must be at least 8 characters long')
  }

  if (confirmPassword !== undefined && password !== confirmPassword) {
    throw new ApiError(400, 'Password and confirm password do not match')
  }

  if (role !== undefined && !isValidUserRole(role)) {
    throw new ApiError(400, 'Invalid user role')
  }

  const normalizedEmail = email.trim().toLowerCase()
  const existingUser = await UserModel.findOne({ email: normalizedEmail })

  if (existingUser) {
    throw new ApiError(409, 'User with this email already exists')
  }

  const passwordHash = await hash(password, saltRounds)
  const user = await UserModel.create({
    fullName: fullName.trim(),
    email: normalizedEmail,
    passwordHash,
    authProviders: ['email'],
    ...(role !== undefined ? { role } : {}),
  })

  sendAuthResponse(res, 201, user, 'User registered successfully')
})

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body as LoginUserBody

  if (typeof email !== 'string' || !email.trim()) {
    throw new ApiError(400, 'Email is required')
  }

  if (!emailRegex.test(email.trim())) {
    throw new ApiError(400, 'Please enter a valid email address')
  }

  if (typeof password !== 'string' || !password) {
    throw new ApiError(400, 'Password is required')
  }

  const user = await UserModel.findOne({ email: email.trim().toLowerCase() }).select('+passwordHash')

  if (!user) {
    throw new ApiError(401, 'Invalid email or password')
  }

  if (!user.passwordHash) {
    throw new ApiError(400, 'This account uses Google sign in')
  }

  const isPasswordCorrect = await compare(password, user.passwordHash)

  if (!isPasswordCorrect) {
    throw new ApiError(401, 'Invalid email or password')
  }

  sendAuthResponse(res, 200, user, 'User logged in successfully')
})

export const redirectToGoogleOAuth = asyncHandler(async (req, res) => {
  const state = typeof req.query.state === 'string' ? req.query.state : undefined
  const googleOAuthClient = getGoogleOAuthClient()
  const url = googleOAuthClient.generateAuthUrl({
    access_type: 'offline',
    prompt: 'select_account',
    scope: ['openid', 'email', 'profile'],
    state,
  })

  res.redirect(url)
})

export const handleGoogleOAuthCallback = asyncHandler(async (req, res) => {
  const code = req.query.code

  if (typeof code !== 'string') {
    throw new ApiError(400, 'Google authorization code is required')
  }

  const googleOAuthClient = getGoogleOAuthClient()
  const { tokens } = await googleOAuthClient.getToken(code)

  if (!tokens.id_token) {
    throw new ApiError(400, 'Google ID token was not returned')
  }

  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: getRequiredEnv('GOOGLE_CLIENT_ID'),
  })
  const payload = ticket.getPayload()

  if (!payload?.sub || !payload.email) {
    throw new ApiError(400, 'Google account details are incomplete')
  }

  if (!payload.email_verified) {
    throw new ApiError(400, 'Google email is not verified')
  }

  const { user, isNewUser } = await findOrCreateGoogleUser({
    googleId: payload.sub,
    email: payload.email.toLowerCase(),
    fullName: payload.name || payload.email.split('@')[0],
  })

  redirectToClientAuthCallback(res, user, isNewUser)
})
