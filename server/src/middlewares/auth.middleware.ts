import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/api-error.js'
import { asyncHandler } from '../utils/async-handler.js'

type AccessTokenPayload = {
  id: string
  email: string
  fullName: string
}

const getAccessTokenSecret = () => {
  const secret = process.env.ACCESS_TOKEN_SECRET

  if (!secret) {
    throw new ApiError(500, 'ACCESS_TOKEN_SECRET is not defined')
  }

  return secret
}

const getBearerToken = (authorizationHeader?: string) => {
  if (!authorizationHeader?.startsWith('Bearer ')) {
    return null
  }

  return authorizationHeader.replace('Bearer ', '').trim()
}

export const verifyJWT = asyncHandler(async (req, _res, next) => {
  const token = getBearerToken(req.headers.authorization)

  if (!token) {
    throw new ApiError(401, 'Unauthorized')
  }

  const decodedToken = jwt.verify(token, getAccessTokenSecret()) as AccessTokenPayload

  req.user = {
    id: decodedToken.id,
    email: decodedToken.email,
    fullName: decodedToken.fullName,
  }

  next()
})
