import type { Metadata } from 'next'
import { Background, Petals, Navbar, Features, Footer } from '@/features/landing'

export const metadata: Metadata = { title: 'Features — Vivaha' }

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Background />
      <Petals />
      <Navbar />
      <main className="relative z-10 pt-24">
        <Features />
      </main>
      <Footer />
    </div>
  )
}
