export type TeamMemberRole = 'planner' | 'coordinator' | 'assistant' | 'owner'

export interface User {
  id: string
  name: string
  email: string
  role: TeamMemberRole
  avatar?: string
}
