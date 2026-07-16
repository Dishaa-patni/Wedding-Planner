import { Background, Petals } from '@/components/shared'
import { Navbar, Pricing, CTA, Footer } from '@/components/landing'

export const metadata = { title: 'Pricing — Vivaha' }

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
