import type { Metadata } from 'next'
import { SignupScreen } from '@/features/auth'

export const metadata: Metadata = { title: 'Create your workspace — Vivaha' }

export default function SignupPage() {
  return <SignupScreen />
}
