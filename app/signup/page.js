import { Background, Petals } from '@/components/shared'
import { Navbar, Footer } from '@/components/landing'

export const metadata = { title: 'Sign up — Vivaha' }

export default function SignupPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Background />
      <Petals />
      <Navbar />
      <main className="relative z-10 pt-40 pb-24 container mx-auto px-4">
        <div className="max-w-md mx-auto glass-strong rounded-2xl p-8 text-center">
          <h1 className="font-display text-3xl text-[#B76E79]">Create your studio</h1>
          <p className="mt-3 text-foreground/70">Signup flow coming soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
