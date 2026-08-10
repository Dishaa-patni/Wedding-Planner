'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CalendarDays,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Gem,
  MessageSquareHeart,
  MoreHorizontal,
  Plus,
  Search,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCreateWeddingWorkspace, useWeddingWorkspaces } from './use-wedding-workspace'
import { CreateWeddingWorkspaceModal } from './components/CreateWeddingWorkspaceModal'
import type { WeddingWorkspace } from './wedding-workspace.types'

const workspaceHighlights = [
  {
    title: 'Moodboards',
    description: 'Collect client inspiration and visual references in one place.',
    icon: MessageSquareHeart,
  },
  {
    title: 'Guest RSVP',
    description: 'Keep families, guests and responses organized for each event.',
    icon: Users,
  },
  {
    title: 'Wedding Management',
    description: 'Track rituals, timelines, tasks and planning details together.',
    icon: ClipboardList,
  },
] as const

const workspaceCoverImages = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
]

type StatusFilter = 'all' | 'active' | 'archived'
type SortOption = 'recent' | 'oldest' | 'name'

const formatWorkspaceDate = (date: string) =>
  new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))

const getWorkspaceStats = (workspace: WeddingWorkspace, index: number) => {
  const seed = workspace._id
    .slice(-4)
    .split('')
    .reduce((total, character) => total + character.charCodeAt(0), 0)

  const members = 6 + ((seed + index) % 12)
  const tasks = 18 + ((seed + index * 7) % 42)
  const progress = 20 + ((seed + index * 11) % 65)

  return { members, tasks, progress }
}

const getWorkspaceStatusLabel = (status: WeddingWorkspace['status']) =>
  status === 'active' ? 'Planning' : 'Archived'

const getWorkspaceStatusClassName = (status: WeddingWorkspace['status']) =>
  status === 'active'
    ? 'bg-[#FFF4DC] text-[#C68A32]'
    : 'bg-[#F1EAFB] text-[#8F70CF]'

export default function WeddingWorkspaceScreen() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sortOption, setSortOption] = useState<SortOption>('recent')
  const [page, setPage] = useState(1)
  const {
    mutate: createWorkspace,
    isPending: isCreatingWorkspace,
  } = useCreateWeddingWorkspace()
  const { data, isLoading: isLoadingWorkspaces } = useWeddingWorkspaces(
    page,
    9,
    statusFilter === 'all' ? undefined : statusFilter,
  )

  const workspaces = data?.weddingWorkspaces ?? []
  const pagination = data?.meta
  const filteredWorkspaces = workspaces
    .filter((workspace) =>
      workspace.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
    )
    .sort((firstWorkspace, secondWorkspace) => {
      if (sortOption === 'name') {
        return firstWorkspace.name.localeCompare(secondWorkspace.name)
      }

      const firstTime = new Date(firstWorkspace.createdAt).getTime()
      const secondTime = new Date(secondWorkspace.createdAt).getTime()

      return sortOption === 'oldest' ? firstTime - secondTime : secondTime - firstTime
    })

  const totalWorkspaces = pagination?.totalItems ?? workspaces.length
  const hasWorkspaces = totalWorkspaces > 0
  const activeCount = statusFilter === 'active' ? totalWorkspaces : undefined
  const archivedCount = statusFilter === 'archived' ? totalWorkspaces : undefined

  const handleCreateWorkspace = (name: string) => {
    createWorkspace(
      { name },
      {
        onSuccess: () => setIsCreateModalOpen(false),
      },
    )
  }

  const handleStatusFilterChange = (nextStatus: StatusFilter) => {
    setStatusFilter(nextStatus)
    setPage(1)
  }

  return (
    <section className="mx-auto w-full max-w-[1480px]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.36em] text-[#D77474]">
            Planning Suite
          </p>
          <h1 className="mt-3 font-display text-3xl leading-tight text-[#3B2928] sm:text-4xl xl:text-5xl">
            Wedding Workspaces
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#756967] sm:text-base">
            Create a dedicated planning home for every couple, from moodboards and guest RSVP
            to timelines, ceremonies and team coordination.
          </p>
        </div>

        {hasWorkspaces && (
          <Button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="h-12 rounded-full bg-[#D77474] px-6 text-white shadow-[0_18px_40px_rgba(215,116,116,0.24)] hover:bg-[#C96464]"
          >
            <Plus className="h-4 w-4" />
            New Wedding Workspace
          </Button>
        )}
      </div>

      {isLoadingWorkspaces ? (
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-[300px] animate-pulse rounded-[26px] border border-[#F0DDD8] bg-white/70 shadow-[0_18px_50px_rgba(183,110,121,0.08)]"
            >
              <div className="h-36 rounded-t-[26px] bg-[#FFF0EE]" />
              <div className="space-y-4 p-6">
                <div className="h-5 w-44 rounded-full bg-[#F4E3DE]" />
                <div className="h-4 w-28 rounded-full bg-[#F4E3DE]" />
                <div className="h-4 w-full rounded-full bg-[#F4E3DE]" />
                <div className="h-3 w-full rounded-full bg-[#F4E3DE]" />
              </div>
            </div>
          ))}
        </div>
      ) : !hasWorkspaces ? (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mx-auto mt-10 flex min-h-[500px] w-full items-center justify-center overflow-hidden rounded-[32px] border border-[#F0DDD8] bg-white/78 px-6 py-8 shadow-[0_24px_80px_rgba(183,110,121,0.12)] sm:px-10"
        >
          <div className="relative mx-auto flex w-full max-w-[900px] flex-col items-center text-center">
            <div className="pointer-events-none absolute -top-20 h-72 w-72 rounded-full bg-[#FFD4CE]/28 blur-3xl" />
            <div className="pointer-events-none absolute top-14 h-44 w-[560px] rounded-full bg-[#F7E4D8]/46 blur-3xl" />

            <div className="relative h-36 w-56">
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-3, 0, -3] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-14 top-4 flex h-28 w-28 items-center justify-center rounded-[30px] bg-[#FFD4CE] text-white shadow-[0_24px_60px_rgba(215,116,116,0.22)]"
              >
                <Gem className="h-12 w-12" strokeWidth={1.5} />
              </motion.div>

              <motion.div
                animate={{ y: [0, 7, 0], x: [0, 5, 0] }}
                transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute right-8 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#D8B26E] shadow-[0_12px_34px_rgba(183,110,121,0.12)] ring-1 ring-[#F0DDD8]"
              >
                <CalendarDays className="h-5 w-5" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0], rotate: [0, 4, 0] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-6 left-7 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#D77474] shadow-[0_12px_34px_rgba(183,110,121,0.12)] ring-1 ring-[#F0DDD8]"
              >
                <MessageSquareHeart className="h-5 w-5" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 5, 0], rotate: [2, -2, 2] }}
                transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-1 right-12 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#756967] shadow-[0_12px_34px_rgba(183,110,121,0.12)] ring-1 ring-[#F0DDD8]"
              >
                <Users className="h-5 w-5" />
              </motion.div>
            </div>

            <h2 className="relative font-display text-3xl leading-tight text-[#3B2928] sm:text-4xl">
              Build Your First Wedding Workspace
            </h2>
            <p className="relative mt-3 max-w-[620px] text-sm leading-6 text-[#756967]">
              Start with a couple&apos;s workspace, then bring together moodboards, guest RSVP,
              ceremony planning and every working note your team needs to run the wedding with calm.
            </p>

            <div className="relative mt-6 flex items-center justify-center">
              <Button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                disabled={isCreatingWorkspace}
                className="h-12 rounded-full bg-[#D77474] px-7 text-white shadow-[0_18px_40px_rgba(215,116,116,0.24)] hover:bg-[#C96464]"
              >
                <Plus className="h-4 w-4" />
                {isCreatingWorkspace ? 'Creating...' : 'Create Workspace'}
              </Button>
            </div>

            <div className="relative mt-8 grid w-full gap-3 md:grid-cols-3">
              {workspaceHighlights.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-[#F0DDD8] bg-white/72 p-4 text-left shadow-[0_16px_48px_rgba(183,110,121,0.06)]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF0EE] text-[#D77474]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-[#3B2928]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-5 text-[#756967]">{item.description}</p>
                  </div>
                )
              })}
            </div>

            <p className="relative mt-6 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#A0928F]">
              Moodboards - Guest RSVP - Wedding Management
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="mt-8">
          <div className="grid gap-3 xl:grid-cols-[minmax(360px,1fr)_auto_auto]">
            <label className="flex h-14 min-w-0 items-center gap-3 rounded-[18px] border border-[#F0DDD8] bg-white/78 px-5 text-[#756967] shadow-sm">
              <Search className="h-5 w-5 shrink-0 text-[#8A7B78]" />
              <span className="sr-only">Search wedding workspaces</span>
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search weddings..."
                className="min-w-0 flex-1 bg-transparent text-sm text-[#3B2928] outline-none placeholder:text-[#A0928F]"
              />
            </label>

            <select
              value={statusFilter}
              onChange={(event) => handleStatusFilterChange(event.target.value as StatusFilter)}
              className="h-14 rounded-[18px] border border-[#F0DDD8] bg-white/78 px-5 text-sm font-semibold text-[#3B2928] shadow-sm outline-none hover:bg-[#FFF0EE] xl:w-[170px]"
            >
              <option value="all">All Workspaces</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>

            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value as SortOption)}
              className="h-14 rounded-[18px] border border-[#F0DDD8] bg-white/78 px-5 text-sm font-semibold text-[#3B2928] shadow-sm outline-none hover:bg-[#FFF0EE] xl:w-[180px]"
            >
              <option value="recent">Recently Created</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {[
              { label: 'All Weddings', value: 'all' as const, count: totalWorkspaces },
              { label: 'Active', value: 'active' as const, count: activeCount },
              { label: 'Archived', value: 'archived' as const, count: archivedCount },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => handleStatusFilterChange(item.value)}
                className={`inline-flex h-11 items-center gap-2 rounded-full border px-5 text-sm font-semibold transition ${
                  statusFilter === item.value
                    ? 'border-[#F0DDD8] bg-[#FFF0EE] text-[#D77474]'
                    : 'border-[#F0DDD8] bg-white/70 text-[#756967] hover:bg-[#FFF0EE] hover:text-[#3B2928]'
                }`}
              >
                {item.label}
                {item.count !== undefined && (
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs text-[#8A7B78]">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {filteredWorkspaces.map((workspace, index) => {
              const stats = getWorkspaceStats(workspace, index)
              const coverImage = workspaceCoverImages[index % workspaceCoverImages.length]

              return (
                <motion.article
                  key={workspace._id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, delay: index * 0.04, ease: 'easeOut' }}
                  className="group overflow-hidden rounded-[24px] border border-[#F0DDD8] bg-white/86 text-left shadow-[0_18px_50px_rgba(183,110,121,0.09)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(183,110,121,0.14)]"
                >
                  <Link href={`/weddings/${workspace._id}`} className="block">
                    <div
                      className="relative h-36 overflow-hidden bg-[#FFF0EE] bg-cover bg-center transition duration-500 group-hover:scale-[1.02]"
                      style={{ backgroundImage: `url(${coverImage})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3B2928]/26 via-transparent to-white/12" />
                      <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-[12px] bg-white text-[#3B2928] shadow-sm transition group-hover:bg-[#FFF0EE]">
                        <MoreHorizontal className="h-5 w-5" />
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h2 className="truncate font-display text-2xl leading-tight text-[#3B2928]">
                            {workspace.name}
                          </h2>
                          <p className="mt-1 text-sm font-medium text-[#756967]">
                            Wedding workspace
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getWorkspaceStatusClassName(
                            workspace.status,
                          )}`}
                        >
                          {getWorkspaceStatusLabel(workspace.status)}
                        </span>
                      </div>

                      <div className="mt-6 grid grid-cols-3 gap-3 text-sm font-semibold text-[#756967]">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-[#D8A88E]" />
                          <span>{formatWorkspaceDate(workspace.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-[#D8A88E]" />
                          <span>{stats.members}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckSquare className="h-4 w-4 text-[#D8A88E]" />
                          <span>{stats.tasks}</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="flex items-center justify-between text-sm font-semibold text-[#756967]">
                          <span>Overall Progress</span>
                          <span className="text-[#3B2928]">{stats.progress}%</span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#F7E4E1]">
                          <div
                            className="h-full rounded-full bg-[#D77474]"
                            style={{ width: `${stats.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              )
            })}
          </div>

          {filteredWorkspaces.length === 0 && (
            <div className="mt-8 rounded-[24px] border border-dashed border-[#F0DDD8] bg-white/60 px-6 py-12 text-center text-sm font-medium text-[#756967]">
              No wedding workspaces match your search.
            </div>
          )}

          {pagination && pagination.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 1))}
                disabled={!pagination.hasPreviousPage}
                className="flex h-10 w-10 items-center justify-center rounded-[14px] text-[#756967] transition hover:bg-[#FFF7F4] hover:text-[#3B2928] disabled:pointer-events-none disabled:opacity-35"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="rounded-[14px] bg-[#FFF0EE] px-4 py-2 text-sm font-semibold text-[#D77474]">
                {pagination.page} of {pagination.totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((currentPage) => currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="flex h-10 w-10 items-center justify-center rounded-[14px] text-[#756967] transition hover:bg-[#FFF7F4] hover:text-[#3B2928] disabled:pointer-events-none disabled:opacity-35"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}

      <CreateWeddingWorkspaceModal
        open={isCreateModalOpen}
        isSubmitting={isCreatingWorkspace}
        existingWorkspaceNames={workspaces.map((workspace) => workspace.name)}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateWorkspace}
      />
    </section>
  )
}
