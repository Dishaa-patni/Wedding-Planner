import { z } from 'zod'
import { PASSWORD_MESSAGE, PASSWORD_RULE, USER_ROLES } from '@/constants'

const LOGIN_ROLES = [USER_ROLES.ADMIN, USER_ROLES.TEAM] as const


export const loginSchema = z.object({
  role: z.enum(LOGIN_ROLES),
 email: z.email({
  error: 'Enter a valid email address',
}).trim(),
  password: z.string().regex(PASSWORD_RULE, PASSWORD_MESSAGE),
})

export type LoginFormValues = z.infer<typeof loginSchema>
