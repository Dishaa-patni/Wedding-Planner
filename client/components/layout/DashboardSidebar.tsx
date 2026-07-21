'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  CalendarDays,
  Gem,
  Image,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  Sparkles,
  Users,
  WalletCards,
  Package,
} from 'lucide-react'
import { SITE } from '@/constants'

interface DashboardSidebarProps {
  className?: string
  onNavigate?: () => void
}

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Weddings', href: '/weddings', icon: Gem },
  { label: 'Team', href: '/team', icon: Users },
  { label: 'Vendors', href: '/vendors', icon: Package },
  { label: 'Media Library', href: '/media-library', icon: Image },
  { label: 'Payments', href: '/finance', icon: WalletCards },
  { label: 'Calendar', href: '/calendar', icon: CalendarDays },
  { label: 'Reports', href: '/dashboard', icon: BarChart3 },
  { label: 'Settings', href: '/settings', icon: Settings },
] as const

export default function DashboardSidebar({ className = '', onNavigate }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={`flex min-h-dvh w-[292px] shrink-0 flex-col border-r border-[#F0DDD8] px-6 py-7 sm:px-8 sm:py-9 ${className}`}
    >
      <Link href="/dashboard" onClick={onNavigate} className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD4CE] text-white shadow-sm">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="leading-tight">
          <div className="font-display text-xl text-[#3B2928]">{SITE.name}</div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.28em] text-[#8A7B78]">
            Studio
          </div>
        </div>
      </Link>

      <nav className="mt-10 space-y-2 sm:mt-14">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive =
            item.label === 'Dashboard'
              ? pathname === '/dashboard'
              : item.href !== '/dashboard' && pathname.startsWith(item.href)

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className={`group flex h-12 items-center gap-4 rounded-2xl px-4 text-[15px] font-medium transition-all ${
                isActive
                  ? 'bg-[#FFF0EE] text-[#3B2928]'
                  : 'text-[#756967] hover:bg-[#FFF0EE] hover:text-[#3B2928]'
              }`}
            >
              <Icon
                className={`h-5 w-5 ${
                  isActive ? 'text-[#D77474]' : 'text-[#756967] group-hover:text-[#D77474]'
                }`}
              />
              <span className="flex-1">{item.label}</span>
              {isActive && <span className="h-2 w-2 rounded-full bg-[#D77474]" />}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto rounded-[24px] bg-white/58 p-4 shadow-[0_16px_48px_rgba(183,110,121,0.06)] ring-1 ring-[#F2DEDA] backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFD4CE] text-sm font-semibold text-white">
            AR
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-[#3B2928]">Ananya Rao</div>
            <div className="truncate text-xs text-[#8A7B78]">Saanjh Weddings</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
          <Link
            href="/settings"
            onClick={onNavigate}
            className="flex h-9 items-center justify-center gap-2 rounded-full bg-white text-sm font-medium text-[#756967] shadow-sm"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <button
            type="button"
            aria-label="Sign out"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#756967] shadow-sm"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Link
        href="/weddings"
        onClick={onNavigate}
        className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#D77474] px-4 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(215,116,116,0.24)] transition-colors hover:bg-[#C96464]"
      >
        <Plus className="h-4 w-4" />
        Quick create
      </Link>
    </aside>
  )
}
