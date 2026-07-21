import type { Metadata } from 'next'
import { AuthLayout } from '@/features/auth'

export const metadata: Metadata = { title: 'Accept invite — Vivaha' }

export default function AcceptInvitePage() {
  return (
    <AuthLayout>
      <div className="space-y-3">
        <h1 className="font-display text-3xl sm:text-[2.2rem] leading-tight text-[#2E2E2E]">
          Accept invite
        </h1>
        <p className="text-sm sm:text-base text-foreground/65">
          Team invite acceptance will be available soon.
        </p>
      </div>
    </AuthLayout>
  )
}
