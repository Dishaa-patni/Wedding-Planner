import type { Metadata } from 'next'
import { AuthLayout, LoginForm } from '@/components/auth'

export const metadata: Metadata = { title: 'Log in — Vivaha' }

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
