import type { Metadata } from 'next'
import { AuthLayout } from '@/features/auth'

export const metadata: Metadata = { title: 'Reset password — Vivaha' }

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <div className="space-y-3">
        <h1 className="font-display text-3xl sm:text-[2.2rem] leading-tight text-[#2E2E2E]">
          Reset password
        </h1>
        <p className="text-sm sm:text-base text-foreground/65">
          Password reset will be available soon.
        </p>
      </div>
    </AuthLayout>
  )
}
