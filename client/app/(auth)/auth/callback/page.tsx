import type { Metadata } from 'next'
import { AuthCallbackPage } from '@/features/auth'

export const metadata: Metadata = { title: 'Signing in — Vivaha' }

export default function GoogleAuthCallbackRoute() {
  return <AuthCallbackPage />
}
