'use client'

import Link from 'next/link'
import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Search,
  Share2,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { WeddingWorkspace } from '../../wedding-workspace.types'
import { teamAvatars } from '../workspace-detail.data'

type WorkspaceHeaderProps = {
  weddingWorkspace: WeddingWorkspace
  weddingDateLabel: string
}

function TeamAvatars() {
  return (
    <div className="flex min-w-0 items-center">
      {teamAvatars.map((avatar, index) => (
        <span
          key={avatar}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#FFD4CE] text-[11px] font-bold text-white shadow-sm"
          style={{ marginLeft: index === 0 ? 0 : -9 }}
        >
          {avatar}
        </span>
      ))}
    </div>
  )
}

export function WorkspaceHeader({
  weddingWorkspace,
  weddingDateLabel,
}: WorkspaceHeaderProps) {
  return (
    <header className="min-w-0">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-[#756967]">
            <Link href="/weddings" className="shrink-0 transition hover:text-[#D77474]">
              Wedding Workspaces
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0 text-[#B9AAA6]" />
            <span className="truncate text-[#3B2928]">{weddingWorkspace.name}</span>
          </div>

          <div className="mt-4 flex min-w-0 items-center gap-3">
            <h1 className="truncate font-display text-4xl leading-tight text-[#3B2928] sm:text-5xl">
              {weddingWorkspace.name}
            </h1>
            <button
              type="button"
              aria-label="Open workspace menu"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF0EE] text-[#756967] transition hover:text-[#3B2928]"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-[#756967]">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#8A7B78]" />
              {weddingDateLabel}
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-[#8A7B78]" />
              120 Guests Expected
            </span>
            <span className="rounded-full bg-[#FFF4DC] px-3 py-1 text-[#C68A32]">
              {weddingWorkspace.status === 'active' ? 'Planning' : 'Archived'}
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-4 xl:items-end">
          <div className="flex min-w-0 flex-wrap items-center gap-3 xl:justify-end">
            <label className="flex h-11 min-w-0 flex-1 items-center gap-3 rounded-[18px] border border-[#F0DDD8] bg-white/86 px-4 text-[#756967] shadow-sm sm:min-w-[310px] xl:w-[360px] xl:flex-none">
              <Search className="h-5 w-5 shrink-0 text-[#8A7B78]" />
              <span className="sr-only">Search in this workspace</span>
              <input
                placeholder="Search in this workspace..."
                className="min-w-0 flex-1 bg-transparent text-sm text-[#3B2928] outline-none placeholder:text-[#A0928F]"
              />
              <span className="hidden rounded-[10px] bg-[#FFF7F4] px-2 py-1 text-xs font-bold text-[#A0928F] sm:inline">
                ⌘K
              </span>
            </label>
            <button
              type="button"
              aria-label="Notifications"
              className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#F0DDD8] bg-white/86 text-[#756967] shadow-sm transition hover:bg-[#FFF0EE] hover:text-[#3B2928]"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[#D77474]" />
            </button>
            <Button
              type="button"
              variant="outline"
              className="h-11 shrink-0 rounded-full border-[#F0DDD8] bg-white/86 px-4 text-[#D77474] hover:bg-[#FFF0EE] hover:text-[#C96464]"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <button
              type="button"
              aria-label="More workspace actions"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#F0DDD8] bg-white/86 text-[#756967] shadow-sm transition hover:bg-[#FFF0EE] hover:text-[#3B2928]"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <TeamAvatars />
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-full border-[#F0DDD8] bg-white/86 px-5 text-[#3B2928] hover:bg-[#FFF0EE]"
            >
              <Users className="h-4 w-4" />
              Add People
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

