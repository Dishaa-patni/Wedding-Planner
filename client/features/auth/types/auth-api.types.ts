export type BackendUserRole = 'owner' | 'member'
export type AuthProvider = 'email' | 'google'

export interface AuthUser {
  id: string
  fullName: string
  email: string
  role: BackendUserRole
  authProviders: AuthProvider[]
  createdAt: string
  updatedAt: string
}

export interface AuthSession {
  user: AuthUser
  accessToken: string
}

export interface ApiResponse<TData> {
  statusCode: number
  data: TData
  message: string
  success: boolean
}

export type AuthResponse = ApiResponse<AuthSession>

export interface RegisterUserRequest {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  role?: BackendUserRole
}

export interface LoginUserRequest {
  email: string
  password: string
}
