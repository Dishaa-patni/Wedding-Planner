import type { Metadata } from 'next'
import { Background, Petals, Navbar, Testimonials, Footer } from '@/features/landing'

export const metadata: Metadata = { title: 'Testimonials — Vivaha' }

export default function TestimonialsPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Background />
      <Petals />
      <Navbar />
      <main className="relative z-10 pt-24">
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
