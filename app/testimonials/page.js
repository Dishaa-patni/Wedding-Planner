import { Background, Petals } from '@/components/shared'
import { Navbar, Testimonials, Footer } from '@/components/landing'

export const metadata = { title: 'Testimonials — Vivaha' }

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
