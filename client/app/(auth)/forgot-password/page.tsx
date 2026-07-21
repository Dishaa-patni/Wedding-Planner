import type { Metadata } from 'next'
import { AuthLayout } from '@/features/auth'

export const metadata: Metadata = { title: 'Forgot password — Vivaha' }

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="space-y-3">
        <h1 className="font-display text-3xl sm:text-[2.2rem] leading-tight text-[#2E2E2E]">
          Forgot password
        </h1>
        <p className="text-sm sm:text-base text-foreground/65">
          Password reset will be available soon.
        </p>
      </div>
    </AuthLayout>
  )
}
