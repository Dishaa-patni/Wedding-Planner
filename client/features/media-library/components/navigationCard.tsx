'use client'

import type { ReactNode } from 'react'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function NavigationCard({
  eyebrow,
  title,
  subtitle,
  action,
  accent,
  compact = false,
  className = '',
  children,
}: {
  eyebrow: { icon: LucideIcon; label: string }
  title: string
  subtitle: string
  action: string
  accent: 'rose' | 'gold'
  compact?: boolean
  className?: string
  children: ReactNode
}) {
  const Icon = eyebrow.icon
  const tabColor = accent === 'rose' ? '#F4B8B2' : '#F7D49A'
  const iconColor = accent === 'rose' ? '#FFD1CB' : '#F7D49A'
  const iconAccent = accent === 'rose' ? '#D77474' : '#D8B26E'

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      className={`group relative flex min-h-[270px] flex-col overflow-hidden rounded-[28px] border border-[#EAD6D2] bg-white/95 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_18px_40px_-24px_rgba(91,55,49,0.35),0_2px_6px_-2px_rgba(91,55,49,0.08)] transition ${className}`}
    >
      <span
        aria-hidden
        className="absolute -top-1 left-8 h-3 w-28 rounded-t-2xl opacity-50"
        style={{ backgroundColor: tabColor }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent"
      />

      <div className={`relative flex h-full flex-1 flex-col ${compact ? 'p-6' : 'p-7'}`}>
        <header className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8A7B78]">
              <Icon className="h-3.5 w-3.5" style={{ color: iconAccent }} />
              {eyebrow.label}
            </p>
            <h2 className="mt-2 font-display text-[33px] leading-none text-[#3B2928]">{title}</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#756967]">{subtitle}</p>
          </div>
          <span
            className="hidden h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-white shadow-[0_14px_32px_-20px_rgba(91,55,49,0.5)] sm:flex"
            style={{ backgroundColor: iconColor }}
          >
            <Icon className="h-6 w-6 text-white" strokeWidth={1.8} />
          </span>
        </header>

        <div className="flex-1">{children}</div>

        <Button
          asChild
          variant="secondary"
          className="mt-4 h-11 justify-between rounded-[16px] bg-[#FFF0EE] px-5 text-sm font-semibold text-[#3B2928] shadow-none transition group-hover:bg-[#FBE5E2]"
        >
          <span>
            {action}
            <ArrowRight className="h-4 w-4 text-[#D77474] transition group-hover:translate-x-1" />
          </span>
        </Button>
      </div>
    </motion.button>
  )
}
