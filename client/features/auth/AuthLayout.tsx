'use client'

import type { ReactNode } from 'react'
import { Flower2 } from 'lucide-react'
import { SITE } from '@/constants'
import WorkflowShowcase from './WorkflowShowcase'

export interface AuthLayoutProps {
  children: ReactNode
}

function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`rounded-full gradient-rose flex items-center justify-center shadow-md ${
          compact ? 'w-8 h-8' : 'w-9 h-9'
        }`}
      >
        <Flower2 className={compact ? 'w-3.5 h-3.5 text-white' : 'w-4 h-4 text-white'} />
      </div>
      <div className="leading-tight">
        <div className={`font-display text-[#B76E79] ${compact ? 'text-lg' : 'text-xl'}`}>
          {SITE.name}
        </div>
        <div className="text-[9px] tracking-[0.25em] uppercase text-foreground/50 -mt-0.5">
          {SITE.tagline}
        </div>
      </div>
    </div>
  )
}

/**
 * Split-screen auth layout: 45% left panel (workflow animation) + 55% form panel.
 * Hides the decorative workflow panel below lg so phone layouts stay focused.
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-dvh w-full overflow-x-hidden flex bg-[#FFF9F6] lg:flex-row">
      {/* LEFT — workflow showcase. Hidden on phone/tablet widths for performance and focus. */}
      <aside
        className="relative hidden lg:flex lg:w-[45%] lg:min-h-dvh overflow-hidden flex-col justify-between px-6 xl:px-10 py-8 xl:py-10"
        style={{
          background:
            'linear-gradient(135deg, #FFF9F6 0%, #FBEEDE 30%, #F6DDE1 70%, #FFF9F6 100%)',
        }}
      >
        {/* Soft ambient blobs */}
        <div aria-hidden className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#EAC7CE]/45 blur-3xl" />
        <div aria-hidden className="absolute -bottom-16 -right-10 w-96 h-96 rounded-full bg-[#D8B26E]/35 blur-3xl" />
        <div aria-hidden className="absolute top-1/3 -right-24 w-72 h-72 rounded-full bg-[#F6DDE1]/60 blur-3xl" />

        {/* Abstract curves */}
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 400 800"
        >
          <defs>
            <linearGradient id="curve-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D8B26E" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#B76E79" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M -20 200 C 100 260, 260 140, 420 300" stroke="url(#curve-grad)" strokeWidth="1.5" fill="none" />
          <path d="M -20 480 C 120 520, 240 420, 420 560" stroke="url(#curve-grad)" strokeWidth="1.5" fill="none" />
        </svg>

        <div className="relative z-10">
          <BrandLockup />
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-6">
          <div className="w-full text-center mb-6">
            <h2 className="font-display text-2xl md:text-3xl text-[#2E2E2E]">
              A single, graceful <span className="gradient-text">workflow</span>
            </h2>
            <p className="mt-2 text-sm text-foreground/60">
              From inquiry to celebration — in one calm workspace.
            </p>
          </div>
          <WorkflowShowcase />
        </div>

        <div className="relative z-10 text-[11px] text-foreground/50">
          © {new Date().getFullYear()} {SITE.legalName}
        </div>
      </aside>

      {/* RIGHT — form */}
      <main className="min-h-dvh w-full lg:w-[55%] flex items-start lg:items-center justify-center px-4 sm:px-6 py-6 sm:py-8 lg:py-14 bg-[#FFF9F6]">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <BrandLockup compact />
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}
