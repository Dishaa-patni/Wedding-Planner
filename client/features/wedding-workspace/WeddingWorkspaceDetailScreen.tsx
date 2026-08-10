'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useWeddingWorkspace } from './use-wedding-workspace'
import { WorkspaceHeader } from './detail/components/WorkspaceHeader'
import { WorkspaceTabs } from './detail/components/WorkspaceTabs'
import { MoodboardScreen } from './detail/moodboard/MoodboardScreen'
import { WorkspaceOverview } from './detail/overview/WorkspaceOverview'
import { PlaceholderTabScreen } from './detail/tabs/PlaceholderTabScreen'
import type { WorkspaceTabId } from './detail/workspace-detail.types'

type WeddingWorkspaceDetailScreenProps = {
  weddingId: string
}

const weddingDate = new Date('2026-12-14T00:00:00')

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date)

const getDaysToWedding = (date: Date) => {
  const today = new Date()
  const difference = date.getTime() - today.getTime()

  return Math.max(0, Math.ceil(difference / (1000 * 60 * 60 * 24)))
}

function WorkspaceDetailSkeleton() {
  return (
    <section className="mx-auto w-full max-w-[1480px] overflow-x-hidden pb-24 md:pb-8">
      <div className="h-7 w-56 animate-pulse rounded-full bg-[#F4E3DE]" />
      <div className="mt-5 h-14 w-full max-w-[520px] animate-pulse rounded-full bg-[#F4E3DE]" />
      <div className="mt-8 h-16 animate-pulse rounded-[22px] bg-white/80" />
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-[22px] border border-[#F0DDD8] bg-white/80"
          />
        ))}
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-80 animate-pulse rounded-[22px] border border-[#F0DDD8] bg-white/80"
          />
        ))}
      </div>
    </section>
  )
}

export default function WeddingWorkspaceDetailScreen({
  weddingId,
}: WeddingWorkspaceDetailScreenProps) {
  const [activeTab, setActiveTab] = useState<WorkspaceTabId>('overview')
  const [isMoodboardBoardMode, setIsMoodboardBoardMode] = useState(false)
  const { data: weddingWorkspace, isLoading, error } = useWeddingWorkspace(weddingId)
  const weddingDateLabel = formatDate(weddingDate)
  const daysToWedding = getDaysToWedding(weddingDate)

  if (isLoading) return <WorkspaceDetailSkeleton />

  if (error || !weddingWorkspace) {
    return (
      <section className="mx-auto w-full max-w-[1480px] overflow-x-hidden pb-8">
        <div className="rounded-[28px] border border-[#F0DDD8] bg-white/82 px-8 py-14 text-center shadow-[0_18px_50px_rgba(183,110,121,0.08)]">
          <p className="font-display text-3xl text-[#3B2928]">Wedding workspace not found</p>
          <p className="mt-3 text-sm text-[#756967]">
            This workspace may have been removed or you may not have access to it.
          </p>
          <Button asChild className="mt-6 rounded-full bg-[#D77474] px-6 text-white hover:bg-[#C96464]">
            <Link href="/weddings">Back to Wedding Workspaces</Link>
          </Button>
        </div>
      </section>
    )
  }

  const handleTabChange = (tabId: WorkspaceTabId) => {
    setIsMoodboardBoardMode(false)
    setActiveTab(tabId)
  }

  const tabScreen = {
    overview: <WorkspaceOverview daysToWedding={daysToWedding} weddingDateLabel={weddingDateLabel} />,
    tasks: (
      <PlaceholderTabScreen
        title="Tasks"
        description="Track checklists, priority work, due dates, assignees and progress for this wedding."
        items={['Finalize guest list', 'Confirm photography team', 'Review decor proposal']}
      />
    ),
    moodboard: (
      <MoodboardScreen
        weddingId={weddingId}
        onBoardModeChange={setIsMoodboardBoardMode}
      />
    ),
    guests: (
      <PlaceholderTabScreen
        title="Guests & RSVP"
        description="Manage guest groups, RSVP status, families, seating and invitations from one focused view."
        items={['Bride family', 'Groom family', 'Vendor guests']}
      />
    ),
    vendors: (
      <PlaceholderTabScreen
        title="Vendors"
        description="Keep assignments, contracts, contacts and booking statuses organized for the planning team."
        items={['Decor partner', 'Photography team', 'Catering vendor']}
      />
    ),
    payments: (
      <PlaceholderTabScreen
        title="Payments"
        description="Review client receivables, vendor payouts, payment schedules and budget movement."
        items={['Client advance', 'Decor payout', 'Venue payment']}
      />
    ),
  } satisfies Record<WorkspaceTabId, ReactNode>

  return (
    <section
      className={
        isMoodboardBoardMode
          ? 'h-dvh w-full overflow-hidden bg-[#FFF9F6] p-2 sm:p-3'
          : 'mx-auto w-full max-w-[1480px] overflow-x-hidden pb-24 md:pb-8'
      }
    >
      {!isMoodboardBoardMode && (
        <WorkspaceHeader weddingWorkspace={weddingWorkspace} weddingDateLabel={weddingDateLabel} />
      )}

      {!isMoodboardBoardMode && (
        <div className="mt-7">
          <WorkspaceTabs activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      )}

      {tabScreen[activeTab]}
    </section>
  )
}
