import {
  Background,
  Petals,
  Navbar,
  Hero,
  TrustedStrip,
  Features,
  DashboardPreview,
  CSVSection,
  Testimonials,
  Pricing,
  FAQ,
  CTA,
  Footer,
} from '@/features/landing'

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Background />
      <Petals />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <TrustedStrip />
        <Features />
        <DashboardPreview />
        <CSVSection />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </div>
  )
}
