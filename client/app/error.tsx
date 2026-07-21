'use client'

export default function ErrorPage() {
  return (
    <main className="min-h-screen bg-[#FFF9F6] flex items-center justify-center px-6">
      <div className="max-w-md text-center space-y-3">
        <h1 className="font-display text-3xl text-[#2E2E2E]">Something went wrong</h1>
        <p className="text-sm text-foreground/65">Please refresh and try again.</p>
      </div>
    </main>
  )
}
