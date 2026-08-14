'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Archive,
  ArrowLeft,
  Flower2,
  Gem,
  Heart,
  ImageIcon,
  Leaf,
  Lightbulb,
  Maximize2,
  MoreHorizontal,
  Music2,
  Play,
  Plus,
  Redo2,
  Share2,
  Upload,
  Undo2,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMoodboardSections } from '../../use-wedding-workspace'
import { moodboardSectionPresets, toneClasses } from '../workspace-detail.data'

type MoodboardScreenProps = {
  weddingId: string
  onBoardModeChange?: (isBoardMode: boolean) => void
}

const inspirationImages = [
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=780&q=80',
  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=520&q=80',
]

const boardReferences = [
  {
    title: 'Peony mandap',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80',
    className: 'left-[1400px] top-[760px] w-[280px] rotate-[-2deg] md:w-[340px]',
    isVideo: false,
  },
  {
    title: 'Udaipur venue reel',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    className: 'left-[2200px] top-[900px] w-[270px] rotate-[2deg] md:w-[360px]',
    isVideo: true,
  },
  {
    title: 'Rose gold table',
    image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=80',
    className: 'left-[2960px] top-[720px] w-[230px] rotate-[1deg] md:w-[290px]',
    isVideo: false,
  },
  {
    title: 'Sunset aisle',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80',
    className: 'left-[1600px] top-[1320px] w-[280px] rotate-[-4deg] md:w-[360px]',
    isVideo: false,
  },
  {
    title: 'Marigold arch',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
    className: 'left-[2540px] top-[1280px] w-[250px] rotate-[1deg] md:w-[320px]',
    isVideo: false,
  },
] as const

const sectionIcons = {
  Haldi: Flower2,
  Mehendi: Leaf,
  Sangeet: Music2,
  Wedding: Gem,
  Reception: Archive,
}

const MIN_BOARD_ZOOM = 0.2
const MAX_BOARD_ZOOM = 2
const DEFAULT_BOARD_ZOOM = 0.82

const clampBoardZoom = (zoom: number) => Math.min(MAX_BOARD_ZOOM, Math.max(MIN_BOARD_ZOOM, zoom))

export function MoodboardScreen({ weddingId, onBoardModeChange }: MoodboardScreenProps) {
  const boardViewportRef = useRef<HTMLElement>(null)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [boardZoom, setBoardZoom] = useState(DEFAULT_BOARD_ZOOM)
  const [boardResetKey, setBoardResetKey] = useState(0)
  const { data: moodboardSections = [] } = useMoodboardSections(weddingId)
  const defaultSection =
    moodboardSections.find((section) => section.isDefault) ??
    moodboardSections.find((section) => section.normalizedName === 'client inspiration')
  const sectionName = defaultSection?.name ?? 'Client Inspiration'

  const openSectionBoard = (sectionLabel: string) => {
    setSelectedSection(sectionLabel)
    setBoardZoom(DEFAULT_BOARD_ZOOM)
    setBoardResetKey((currentKey) => currentKey + 1)
    onBoardModeChange?.(true)
  }

  const closeSectionBoard = () => {
    setSelectedSection(null)
    onBoardModeChange?.(false)
  }

  useEffect(() => {
    if (!selectedSection) return

    document.body.classList.add('moodboard-focus-mode')

    return () => {
      document.body.classList.remove('moodboard-focus-mode')
    }
  }, [selectedSection])

  useEffect(() => {
    const boardViewport = boardViewportRef.current

    if (!boardViewport || !selectedSection) return

    const handleWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return

      event.preventDefault()
      setBoardZoom((currentZoom) => clampBoardZoom(currentZoom + (event.deltaY > 0 ? -0.06 : 0.06)))
    }

    boardViewport.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      boardViewport.removeEventListener('wheel', handleWheel)
    }
  }, [selectedSection])

  const zoomOut = () => setBoardZoom((currentZoom) => clampBoardZoom(currentZoom - 0.1))
  const zoomIn = () => setBoardZoom((currentZoom) => clampBoardZoom(currentZoom + 0.1))
  const fitBoard = () => {
    setBoardZoom(DEFAULT_BOARD_ZOOM)
    setBoardResetKey((currentKey) => currentKey + 1)
  }

  if (selectedSection) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex h-full flex-col overflow-hidden"
      >
        <div className="z-50 flex shrink-0 flex-wrap items-center justify-between gap-3 rounded-[24px] border border-[#F0DDD8] bg-white/88 px-3 py-2 shadow-[0_16px_42px_rgba(183,110,121,0.1)] backdrop-blur-xl sm:px-4">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={closeSectionBoard}
              aria-label="Back to moodboard"
              className="h-10 w-10 shrink-0 rounded-full border-[#F0DDD8] bg-white p-0 text-[#3B2928] hover:bg-[#FFF7F4]"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D77474]">
                Creative Board
              </p>
              <h2 className="truncate font-display text-2xl leading-none text-[#3B2928] sm:text-3xl">
                {selectedSection.toLowerCase() === 'client inspiration'
                  ? selectedSection
                  : `${selectedSection} Theme`}
              </h2>
            </div>
          </div>

          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex h-10 items-center gap-2 rounded-full border border-[#F0DDD8] bg-white px-3 shadow-[0_12px_30px_rgba(183,110,121,0.05)]">
              <Undo2 className="h-4 w-4 text-[#756967]" />
              <Redo2 className="h-4 w-4 text-[#756967]" />
              <span className="h-5 w-px bg-[#E8D7D2]" />
              <button type="button" onClick={zoomOut} aria-label="Zoom out">
                <ZoomOut className="h-4 w-4 text-[#756967]" />
              </button>
              <span className="min-w-10 text-center text-xs font-bold text-[#8A7B78]">
                {Math.round(boardZoom * 100)}%
              </span>
              <button type="button" onClick={zoomIn} aria-label="Zoom in">
                <ZoomIn className="h-4 w-4 text-[#756967]" />
              </button>
              <button
                type="button"
                onClick={fitBoard}
                aria-label="Fit board to screen"
                className="ml-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#FFF7F4] text-[#756967] transition hover:bg-[#FFF0EE] hover:text-[#3B2928]"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-10 rounded-full border-[#F0DDD8] bg-white px-4 text-[#3B2928] hover:bg-[#FFF7F4]"
            >
              <Plus className="h-4 w-4" />
              Add Note
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-10 rounded-full border-[#F0DDD8] bg-white px-4 text-[#3B2928] hover:bg-[#FFF7F4]"
            >
              <Link href={`/media-library?weddingId=${weddingId}`}>
                <Plus className="h-4 w-4" />
                Add Reference
              </Link>
            </Button>

            <Button
              type="button"
              variant="outline"
              className="hidden h-10 rounded-full border-[#F0DDD8] bg-white px-4 text-[#3B2928] hover:bg-[#FFF7F4] xl:inline-flex"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>

            <Button
              type="button"
              className="h-10 rounded-full bg-[#D77474] px-5 text-white shadow-[0_18px_40px_rgba(215,116,116,0.22)] hover:bg-[#C96464]"
            >
              <Gem className="h-4 w-4" />
              Finalize
            </Button>
          </div>
        </div>

        <section
          ref={boardViewportRef}
          className="relative mt-2 min-h-0 flex-1 overflow-hidden rounded-[24px] border border-[#F0DDD8] bg-[#FFFDFB] shadow-[0_16px_46px_rgba(183,110,121,0.08)] ring-1 ring-[#FFF3F0]"
        >
          <div className="pointer-events-none absolute left-5 top-5 z-40 rounded-full bg-white/88 px-4 py-2 text-xs font-bold text-[#8A7B78] shadow-[0_10px_28px_rgba(59,41,40,0.08)]">
            Drag empty space to move. Pinch over board to zoom.
          </div>

          <motion.div
            key={boardResetKey}
            drag
            dragMomentum={false}
            initial={{ x: -1050, y: -440 }}
            className="absolute left-0 top-0 h-[3600px] w-[5400px] origin-top-left cursor-grab bg-[#FFFDFB] active:cursor-grabbing"
            style={{ scale: boardZoom }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_28%,rgba(255,240,238,0.9),transparent_30%),linear-gradient(#F6E6E1_1px,transparent_1px),linear-gradient(90deg,#F6E6E1_1px,transparent_1px)] bg-[size:100%_100%,48px_48px,48px_48px] opacity-70" />

            {boardReferences.map((reference) => (
              <motion.article
                key={reference.title}
                drag
                dragMomentum={false}
                whileDrag={{ scale: 1.03, zIndex: 40 }}
                className={`absolute z-10 cursor-grab rounded-[24px] border-[10px] border-white bg-white shadow-[0_24px_60px_rgba(59,41,40,0.18)] active:cursor-grabbing ${reference.className}`}
                onPointerDown={(event) => event.stopPropagation()}
              >
                <div
                  className="relative h-[240px] rounded-[14px] bg-cover bg-center md:h-[300px]"
                  style={{ backgroundImage: `url(${reference.image})` }}
                >
                  <div className="absolute inset-x-0 bottom-0 rounded-b-[14px] bg-gradient-to-t from-[#3B2928]/72 to-transparent px-4 pb-4 pt-16">
                    <p className="text-sm font-bold text-white">{reference.title}</p>
                  </div>
                  {reference.isVideo && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#D77474] shadow-lg">
                        <Play className="ml-1 h-5 w-5 fill-[#D77474]" />
                      </span>
                    </span>
                  )}
                </div>
              </motion.article>
            ))}

            <motion.article
              drag
              dragMomentum={false}
              whileDrag={{ scale: 1.03, zIndex: 50 }}
              className="absolute left-[1780px] top-[560px] z-30 w-[340px] rotate-[-4deg] cursor-grab bg-[#FFF48B] p-7 text-[#3B2928] shadow-[0_28px_50px_rgba(59,41,40,0.18)] active:cursor-grabbing"
              onPointerDown={(event) => event.stopPropagation()}
            >
              <span className="absolute left-1/2 top-[-18px] h-9 w-9 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_30%_25%,#FF9B8D,#D62424_65%,#9C1414)] shadow-[0_10px_18px_rgba(156,20,20,0.3)]" />
              <p
                className="text-[19px] leading-7"
                style={{ fontFamily: "'Bradley Hand', 'Comic Sans MS', cursive" }}
              >
                Client loves this setup but wants white flowers instead of yellow. Increase stage
                lighting and reduce floral density.
              </p>
            </motion.article>

            <motion.article
              drag
              dragMomentum={false}
              whileDrag={{ scale: 1.03, zIndex: 50 }}
              className="absolute left-[2860px] top-[1080px] z-30 w-[280px] rotate-[3deg] cursor-grab bg-[#FFE1E4] p-6 text-[#3B2928] shadow-[0_24px_46px_rgba(59,41,40,0.16)] active:cursor-grabbing"
              onPointerDown={(event) => event.stopPropagation()}
            >
              <span className="absolute left-1/2 top-[-16px] h-8 w-8 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_30%_25%,#FF9B8D,#D62424_65%,#9C1414)] shadow-[0_10px_18px_rgba(156,20,20,0.28)]" />
              <p
                className="text-[19px] leading-7"
                style={{ fontFamily: "'Bradley Hand', 'Comic Sans MS', cursive" }}
              >
                Add small candles near the aisle entrance.
              </p>
            </motion.article>
          </motion.div>
        </section>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="mt-7"
    >
      <p className="max-w-2xl text-sm leading-6 text-[#756967]">
        Collect ideas, client preferences and visual references in one beautiful space.
      </p>

      <section className="relative mt-6 overflow-hidden rounded-[26px] border border-[#F2CFCB] bg-white/88 p-6 shadow-[0_18px_55px_rgba(183,110,121,0.08)] lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <span className="text-[#D8B26E]">✦</span>
            <h2 className="truncate font-display text-2xl text-[#3B2928]">{sectionName}</h2>
            <span className="rounded-full bg-[#FFF0EE] px-3 py-1 text-xs font-bold text-[#D77474]">
              0 items
            </span>
          </div>
          <button
            type="button"
            aria-label="Open moodboard section menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#3B2928] transition hover:bg-[#FFF0EE]"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        <div className="relative mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative min-h-[280px]">
            <motion.div
              animate={{ rotate: [-4, -2, -4], y: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-[8%] top-12 z-10 w-[280px] max-w-[58vw] rotate-[-5deg] rounded-[16px] bg-white p-3 shadow-[0_20px_50px_rgba(59,41,40,0.14)]"
            >
              <div className="absolute left-1/2 top-[-16px] h-8 w-24 -translate-x-1/2 rotate-[-2deg] rounded-[4px] bg-[#F4D8BD]/72" />
              <div
                className="h-40 rounded-[12px] bg-cover bg-center"
                style={{ backgroundImage: `url(${inspirationImages[0]})` }}
              />
            </motion.div>

            <motion.div
              animate={{ rotate: [6, 3, 6], y: [0, 5, 0] }}
              transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-[42%] top-3 z-20 w-[220px] max-w-[48vw] rotate-[5deg] rounded-[15px] bg-white p-3 shadow-[0_18px_46px_rgba(59,41,40,0.13)]"
            >
              <div className="absolute left-8 top-[-14px] h-7 w-20 rotate-[5deg] rounded-[4px] bg-[#F4D8BD]/72" />
              <div
                className="relative h-28 rounded-[11px] bg-cover bg-center"
                style={{ backgroundImage: `url(${inspirationImages[1]})` }}
              >
                <div className="absolute inset-0 rounded-[11px] bg-[#3B2928]/18" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3B2928]/55 text-white backdrop-blur-sm">
                    <Play className="ml-1 h-5 w-5 fill-white" />
                  </span>
                </span>
              </div>
            </motion.div>

            <motion.div
              animate={{ rotate: [3, -1, 3], y: [0, -3, 0] }}
              transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-3 left-[55%] z-30 w-48 rotate-[3deg] rounded-[12px] bg-[#FFF3A8] p-4 shadow-[0_18px_45px_rgba(59,41,40,0.14)]"
            >
              <p className="text-base leading-6 text-[#3B2928]">
                Prefer white flowers instead of pink.
              </p>
              <Heart className="ml-auto mt-2 h-5 w-5 text-[#D77474]" />
            </motion.div>
          </div>

          <div className="min-w-0 max-w-[440px]">
            <h3 className="font-display text-3xl leading-tight text-[#3B2928]">
              Start the couple&apos;s inspiration story
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#756967]">
              Browse your media library and save anything the client loves. Everything will first
              appear inside {sectionName}.
            </p>
            <div className="mt-6 grid gap-3">
              <Button
                asChild
                className="h-12 rounded-full bg-[#D77474] px-7 text-white shadow-[0_18px_40px_rgba(215,116,116,0.22)] hover:bg-[#C96464]"
              >
                <Link href={`/media-library?weddingId=${weddingId}`}>
                  <ImageIcon className="h-4 w-4" />
                  Browse Media Library
                </Link>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 rounded-full border-[#F0DDD8] bg-white/86 px-7 text-[#8B2E2E] hover:bg-[#FFF7F4]"
              >
                <Upload className="h-4 w-4 text-[#D77474]" />
                Upload Reference
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => openSectionBoard(sectionName)}
                className="h-12 rounded-full border-[#F0DDD8] bg-white/86 px-7 text-[#3B2928] hover:bg-[#FFF7F4]"
              >
                <ImageIcon className="h-4 w-4 text-[#D77474]" />
                View Inspiration
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-7 flex items-center gap-3">
        <span className="text-[#D8B26E]">✧</span>
        <h3 className="text-base font-bold text-[#3B2928]">Organize when you&apos;re ready</h3>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {moodboardSectionPresets.map((section) => {
          const Icon = sectionIcons[section.label]

          return (
            <button
              key={section.label}
              type="button"
              onClick={() => openSectionBoard(section.label)}
              className="flex h-16 min-w-0 items-center gap-3 rounded-[18px] border border-[#F0DDD8] bg-white/82 px-4 text-left shadow-[0_12px_30px_rgba(183,110,121,0.05)] transition hover:-translate-y-0.5 hover:bg-white"
            >
              <span className={`${toneClasses[section.tone]} flex h-10 w-10 shrink-0 items-center justify-center rounded-full`}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="truncate text-sm font-bold text-[#3B2928]">{section.label}</span>
            </button>
          )
        })}

        <button
          type="button"
          className="flex h-16 items-center justify-center gap-3 rounded-[18px] border border-dashed border-[#F2CFCB] bg-white/54 px-4 text-[#D77474] transition hover:bg-[#FFF7F4]"
        >
          <Plus className="h-4 w-4" />
          <span className="text-sm font-bold">Custom Section</span>
        </button>
      </div>

      <div className="mt-6 flex items-start gap-4 rounded-[20px] border border-[#F2CFCB] bg-[#FFF0EE]/70 px-5 py-4 text-[#3B2928]">
        <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-[#D77474]" />
        <p className="flex-1 text-sm leading-6">
          <span className="font-bold">Tip:</span> During your meeting, save everything in Client
          Inspiration. Later you can move items into sections like Haldi, Mehendi and Wedding.
        </p>
        <button
          type="button"
          aria-label="Dismiss moodboard tip"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#D77474] transition hover:bg-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}
