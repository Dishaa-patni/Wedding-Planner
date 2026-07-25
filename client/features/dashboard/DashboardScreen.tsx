'use client'
import { useCurrentOrganization } from '@/features/onboarding/hooks/use-onboarding'

export default function DashboardScreen() {

  const {data} = useCurrentOrganization()
  return (
    <section className="mx-auto w-full max-w-[1480px]">
      <p className="text-[12px] font-medium uppercase tracking-[0.32em] text-[#D77474]">
        Saturday · 18 July
      </p>
      <h1 className="mt-3 font-display text-3xl leading-tight text-[#3B2928] sm:text-4xl xl:text-5xl">
          {data?.user?.fullName ?? 'Welcome back'}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#756967] sm:text-base">
        Here's what's happening across your wedding business today.
      </p>
    </section>
  )
}
