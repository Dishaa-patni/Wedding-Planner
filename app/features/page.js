import { Background, Petals } from '@/components/shared'
import { Navbar, Features, Footer } from '@/components/landing'

export const metadata = { title: 'Features — Vivaha' }

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
