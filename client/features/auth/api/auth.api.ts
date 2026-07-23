import { apiClient } from '@/services'
import { USER_ROLES } from '@/constants'
import type { LoginFormValues, SignupFormValues } from '../schemas'
import type {
  AuthResponse,
  BackendUserRole,
  LoginUserRequest,
  RegisterUserRequest,
} from '../types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

const BACKEND_ROLE_BY_FORM_ROLE: Record<SignupFormValues['role'], BackendUserRole> = {
  [USER_ROLES.ADMIN]: 'owner',
  [USER_ROLES.TEAM]: 'member',
}

const getSignupDisplayName = (values: SignupFormValues) => {
  const maybeCompanyName = 'companyName' in values ? values.companyName : undefined

  return (
    values.ownerName?.trim() ||
    (typeof maybeCompanyName === 'string' ? maybeCompanyName.trim() : '') ||
    values.email.trim().split('@')[0]
  )
}

export const mapSignupToRegisterRequest = (values: SignupFormValues): RegisterUserRequest => ({
  fullName: getSignupDisplayName(values),
  email: values.email.trim().toLowerCase(),
  password: values.password,
  confirmPassword: values.confirmPassword,
  role: BACKEND_ROLE_BY_FORM_ROLE[values.role],
})

export const mapLoginToLoginRequest = (values: LoginFormValues): LoginUserRequest => ({
  email: values.email.trim().toLowerCase(),
  password: values.password,
})

const buildGoogleOAuthUrl = (state?: string) => {
  const url = new URL('/api/auth/google', API_BASE_URL)

  if (state) {
    url.searchParams.set('state', state)
  }

  return url.toString()
}

export const authApi = {
  register: (payload: RegisterUserRequest) =>
    apiClient.post<AuthResponse, RegisterUserRequest>('/api/auth/register', payload),

  login: (payload: LoginUserRequest) =>
    apiClient.post<AuthResponse, LoginUserRequest>('/api/auth/login', payload),

  startGoogleOAuth: (state?: string) => {
    window.location.assign(buildGoogleOAuthUrl(state))
  },
}
