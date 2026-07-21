import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-[#FFF9F6] flex items-center justify-center px-6">
      <div className="max-w-md text-center space-y-4">
        <h1 className="font-display text-3xl text-[#2E2E2E]">Page not found</h1>
        <p className="text-sm text-foreground/65">The page you are looking for does not exist.</p>
        <Link href="/" className="inline-flex text-sm font-medium text-[#B76E79] hover:underline">
          Return home
        </Link>
      </div>
    </main>
  )
}
