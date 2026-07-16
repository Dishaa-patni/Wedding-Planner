export type UserRole = 'planner' | 'coordinator' | 'assistant' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}
