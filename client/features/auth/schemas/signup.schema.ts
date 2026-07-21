import { z } from 'zod'
import { PASSWORD_MESSAGE, PASSWORD_RULE, USER_ROLES } from '@/constants'

const SIGNUP_ROLES = [USER_ROLES.ADMIN, USER_ROLES.TEAM] as const


export const signupSchema = z
  .object({
    role: z.enum(SIGNUP_ROLES),
    companyName: z.string().optional(),
    ownerName: z.string().trim().min(1, 'Owner name is required'),
   email: z.email({
  error: 'Enter a valid email address',
}).trim(),
    password: z.string().regex(PASSWORD_RULE, PASSWORD_MESSAGE),
    confirmPassword: z.string().min(1, 'Confirm your password'),
    inviteCode: z.string().optional(),
    agreedToTerms: z.boolean().refine((value) => value, {
      message: 'You must agree to the terms',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      })
    }

    if (data.role === USER_ROLES.ADMIN && !data.companyName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['companyName'],
        message: 'Company name is required',
      })
    }

    if (data.role === USER_ROLES.TEAM && !data.inviteCode?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['inviteCode'],
        message: 'Invite code is required',
      })
    }
  })

export type SignupFormValues = z.infer<typeof signupSchema>
