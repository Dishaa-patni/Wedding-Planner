import type { Metadata } from 'next'
import { Background, Petals, Navbar, FAQ, Footer } from '@/features/landing'

export const metadata: Metadata = { title: 'FAQ — Vivaha' }

export default function FaqPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Background />
      <Petals />
      <Navbar />
      <main className="relative z-10 pt-24">
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
