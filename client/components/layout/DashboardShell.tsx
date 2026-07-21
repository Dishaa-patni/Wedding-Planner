'use client'

import { useState, type ReactNode } from 'react'
import { Menu, Sparkles, X } from 'lucide-react'
import { SITE } from '@/constants'
import DashboardSidebar from './DashboardSidebar'

export default function DashboardShell({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-dvh bg-[#FFF7F4] text-[#3B2928] lg:flex">
      <DashboardSidebar className="hidden lg:flex" />

      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#F0DDD8] bg-[#FFF7F4]/92 px-4 backdrop-blur-xl sm:px-6 lg:hidden">
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open dashboard menu"
          aria-expanded={isSidebarOpen}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/72 text-[#3B2928] shadow-sm ring-1 ring-[#F2DEDA] transition-colors hover:bg-[#FFF0EE]"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFD4CE] text-white shadow-sm">
            <Sparkles className="h-[18px] w-[18px]" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg text-[#3B2928]">{SITE.name}</div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-[#8A7B78]">Studio</div>
          </div>
        </div>

        <div className="h-10 w-10" aria-hidden />
      </header>

      <div
        aria-hidden={!isSidebarOpen}
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 z-50 bg-[#3B2928]/24 backdrop-blur-[2px] transition-opacity lg:hidden ${
          isSidebarOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        className={`fixed inset-y-0 left-0 z-50 w-[min(86vw,320px)] transition-transform duration-300 ease-out lg:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="relative h-full bg-[#FFF7F4] shadow-[24px_0_60px_rgba(183,110,121,0.18)]">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close dashboard menu"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#3B2928] shadow-sm ring-1 ring-[#F2DEDA] transition-colors hover:bg-[#FFF0EE]"
          >
            <X className="h-[18px] w-[18px]" />
          </button>
          <DashboardSidebar
            className="h-full w-full overflow-y-auto border-r-0"
            onNavigate={() => setIsSidebarOpen(false)}
          />
        </div>
      </div>

      <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 md:px-8 lg:px-10 lg:py-9 xl:px-12">
        {children}
      </main>
    </div>
  )
}
