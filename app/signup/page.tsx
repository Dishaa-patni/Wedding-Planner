import type { Metadata } from 'next'
import { AuthLayout, SignupForm } from '@/components/auth'

export const metadata: Metadata = { title: 'Create your workspace — Vivaha' }

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  )
}
