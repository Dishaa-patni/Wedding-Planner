'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { appToast } from '@/components/ui/app-toaster'
import { accessTokenStore } from './storage/access-token'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''))
    const accessToken = hashParams.get('accessToken')
    const isNewUser = hashParams.get('isNewUser') === 'true'

    if (!accessToken) {
      appToast.error({
        title: 'Google sign in failed',
        description: 'Access token was not returned. Please try again.',
      })
      router.replace('/login')
      return
    }

    accessTokenStore.set(accessToken)
    appToast.success({
      title: 'Google sign in successful',
      description: isNewUser
        ? 'Let us set up your organization.'
        : 'Redirecting you to your dashboard.',
    })
    router.replace(isNewUser ? '/onboarding' : '/dashboard')
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFF9F6] px-6 text-center">
      <div>
        <h1 className="font-display text-3xl text-[#2E2E2E]">Signing you in</h1>
        <p className="mt-2 text-sm text-foreground/65">Please wait while we finish your Google login.</p>
      </div>
    </div>
  )
}
