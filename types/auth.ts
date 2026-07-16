import type { LucideIcon } from './common'

export type UserRole = 'admin' | 'team'

export interface WorkflowStep {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export interface SignupFormData {
  role: UserRole
  companyName: string
  ownerName: string
  email: string
  password: string
  confirmPassword: string
  inviteCode?: string
  agreedToTerms: boolean
}

export interface LoginFormData {
  role: UserRole
  email: string
  password: string
  rememberMe: boolean
}

export interface RoleOption {
  value: UserRole
  label: string
  description: string
}
