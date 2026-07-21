import type { Metadata } from 'next'
import { Background, Petals, Navbar, Pricing, CTA, Footer } from '@/features/landing'

export const metadata: Metadata = { title: 'Pricing — Vivaha' }

export default function PricingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Background />
      <Petals />
      <Navbar />
      <main className="relative z-10 pt-24">
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
