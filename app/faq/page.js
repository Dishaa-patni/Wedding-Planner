import { Background, Petals } from '@/components/shared'
import { Navbar, FAQ, Footer } from '@/components/landing'

export const metadata = { title: 'FAQ — Vivaha' }

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
