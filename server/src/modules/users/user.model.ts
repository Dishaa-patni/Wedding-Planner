import jwt from 'jsonwebtoken'
import { Schema, model, type HydratedDocument, type Model } from 'mongoose'
import { USER_ROLE_VALUES, USER_ROLES } from '../../constants/role.js'

export type UserRole = (typeof USER_ROLE_VALUES)[number]

export interface User {
  fullName: string
  email: string
  passwordHash?: string
  authProviders: Array<'email' | 'google'>
  googleId?: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export interface UserMethods {
  generateAccessToken(): string
  generateRefreshToken(): string
}

export type UserDocument = HydratedDocument<User, UserMethods>

type UserModel = Model<User, Record<string, never>, UserMethods>

const getJwtSecret = (envKey: 'ACCESS_TOKEN_SECRET' | 'REFRESH_TOKEN_SECRET'): string => {
  const secret = process.env[envKey]

  if (!secret) {
    throw new Error(`${envKey} is not defined`)
  }

  return secret
}

const userSchema = new Schema<User, UserModel, UserMethods>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      select: false,
    },

    authProviders: {
      type: [String],
      enum: ['email', 'google'],
      default: ['email'],
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    role: {
      type: String,
      enum: USER_ROLE_VALUES,
      default: USER_ROLES.OWNER,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'users',
  },
)

userSchema.index({ googleId: 1 }, { unique: true, sparse: true })

userSchema.methods.generateAccessToken = function generateAccessToken() {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      fullName: this.fullName,
    },
    getJwtSecret('ACCESS_TOKEN_SECRET'),
    {
      expiresIn: '15m',
    },
  )
}

userSchema.methods.generateRefreshToken = function generateRefreshToken() {
  return jwt.sign(
    {
      id: this._id,
    },
    getJwtSecret('REFRESH_TOKEN_SECRET'),
    {
      expiresIn: '7d',
    },
  )
}

export const UserModel = model<User, UserModel>('User', userSchema)
