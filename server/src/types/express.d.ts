import type { UserRole } from '../modules/users/user.model.js'

declare global {
  namespace Express {
    interface UserPayload {
      id: string
      email: string
      fullName: string
      role?: UserRole
    }

    interface Request {
      user?: UserPayload
    }
  }
}

export {}
