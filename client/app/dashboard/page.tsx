import type { Metadata } from 'next'
import { Background, Petals } from '@/components/shared'
import { Navbar, DashboardPreview, Footer } from '@/components/landing'

export const metadata: Metadata = { title: 'Dashboard — Vivaha' }

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Background />
      <Petals />
      <Navbar />
      <main className="relative z-10 pt-24">
        <DashboardPreview />
      </main>
      <Footer />
    </div>
  )
}
