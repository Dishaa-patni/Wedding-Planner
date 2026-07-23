import type { Metadata } from 'next'
import { OrganizationOnboardingScreen } from '@/features/onboarding'

export const metadata: Metadata = { title: 'Organization Setup — Vivaha' }

export default function OnboardingPage() {
  return <OrganizationOnboardingScreen />
}
