import type { Metadata } from 'next'
import { Background, Petals } from '@/components/shared'
import { Navbar, Footer } from '@/components/landing'

export const metadata: Metadata = { title: 'Log in — Vivaha' }

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Background />
      <Petals />
      <Navbar />
      <main className="relative z-10 pt-40 pb-24 container mx-auto px-4">
        <div className="max-w-md mx-auto glass-strong rounded-2xl p-8 text-center">
          <h1 className="font-display text-3xl text-[#B76E79]">Welcome back</h1>
          <p className="mt-3 text-foreground/70">Login flow coming soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
