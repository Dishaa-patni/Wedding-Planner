import type { ErrorRequestHandler } from 'express'
import mongoose from 'mongoose'
import { ApiError } from '../utils/api-error.js'

type MongoDuplicateKeyError = Error & {
  code?: number
  keyValue?: Record<string, unknown>
}

const isDuplicateKeyError = (error: Error): error is MongoDuplicateKeyError => {
  return 'code' in error && (error as MongoDuplicateKeyError).code === 11000
}

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  let statusCode = 500
  let message = 'Something went wrong'
  let errors: unknown[] = []

  if (error instanceof ApiError) {
    statusCode = error.statusCode
    message = error.message
    errors = error.errors
  } else if (error instanceof mongoose.Error.ValidationError) {
    statusCode = 400
    message = 'Validation failed'
    errors = Object.values(error.errors).map((validationError) => validationError.message)
  } else if (isDuplicateKeyError(error)) {
    statusCode = 409
    message = 'Resource already exists'
    errors = error.keyValue ? [error.keyValue] : []
  } else if (error instanceof Error && error.message) {
    message = error.message
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors,
  })
}
