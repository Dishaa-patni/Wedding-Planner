'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Heart,
  Loader2,
  MoreHorizontal,
  Play,
  Plus,
  StickyNote,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { MediaLibraryItem } from '../media-library.types'

type MediaPresentationModalProps = {
  media: MediaLibraryItem | null
  open: boolean
  currentIndex: number
  totalItems: number
  canGoPrevious: boolean
  canGoNext: boolean
  isAddingToMoodboard: boolean
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
  onAddToMoodboard: (note: string) => void
}

const getMediaLabel = (media: MediaLibraryItem) => {
  const extension = media.originalName.split('.').pop()

  if (extension) return extension.toUpperCase()

  return media.type === 'video' ? 'MP4' : 'JPG'
}

const getCollectionLabel = (media: MediaLibraryItem) => {
  if (!media.collectionId) return 'All Media'

  if (typeof media.collectionId === 'object') {
    return media.collectionId.name
  }

  return 'Collection'
}

const getUploaderLabel = (media: MediaLibraryItem) => {
  if (typeof media.uploadedBy === 'object') {
    return media.uploadedBy.fullName
  }

  return 'Vivaha Studio'
}

export function MediaPresentationModal({
  media,
  open,
  currentIndex,
  totalItems,
  canGoPrevious,
  canGoNext,
  isAddingToMoodboard,
  onClose,
  onPrevious,
  onNext,
  onAddToMoodboard,
}: MediaPresentationModalProps) {
  const [isNoteOpen, setIsNoteOpen] = useState(false)
  const [note, setNote] = useState('')

  const metaText = useMemo(() => {
    if (!media) return ''

    return `${getMediaLabel(media)} - ${getCollectionLabel(media)} - Uploaded by ${getUploaderLabel(media)}`
  }, [media])

  useEffect(() => {
    if (!open) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft' && canGoPrevious) onPrevious()
      if (event.key === 'ArrowRight' && canGoNext) onNext()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [canGoNext, canGoPrevious, onClose, onNext, onPrevious, open])

  useEffect(() => {
    if (!open) return

    setIsNoteOpen(false)
    setNote('')
  }, [media?._id, open])

  return (
    <AnimatePresence>
      {open && media && (
        <motion.div
          className="fixed inset-0 z-[90] bg-[#120C0C]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Media presentation preview"
        >
          <motion.div
            className="relative flex h-dvh w-dvw overflow-hidden bg-[#120C0C]"
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="absolute right-5 top-5 z-20 flex items-center gap-3">
              <button
                type="button"
                aria-label="Favorite media"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-black/42 text-white shadow-lg backdrop-blur-md transition hover:bg-black/64"
              >
                <Heart className="h-5 w-5" />
              </button>
              <a
                href={media.url}
                download={media.originalName}
                aria-label="Download media"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-black/42 text-white shadow-lg backdrop-blur-md transition hover:bg-black/64"
                onClick={(event) => event.stopPropagation()}
              >
                <Download className="h-5 w-5" />
              </a>
              <button
                type="button"
                aria-label="More media actions"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-black/42 text-white shadow-lg backdrop-blur-md transition hover:bg-black/64"
              >
                <MoreHorizontal className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close preview"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-black/42 text-white shadow-lg backdrop-blur-md transition hover:bg-black/64"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <button
              type="button"
              aria-label="Previous media"
              disabled={!canGoPrevious}
              onClick={onPrevious}
              className="absolute left-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/46 text-white shadow-lg backdrop-blur-md transition hover:bg-black/68 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              aria-label="Next media"
              disabled={!canGoNext}
              onClick={onNext}
              className="absolute right-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/46 text-white shadow-lg backdrop-blur-md transition hover:bg-black/68 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="relative h-full w-full">
              {media.type === 'video' ? (
                <video
                  src={media.url}
                  controls
                  className="h-full w-full bg-black object-contain"
                />
              ) : (
                <img
                  src={media.url}
                  alt={media.displayName}
                  className="h-full w-full object-contain"
                />
              )}

              {media.type === 'video' && (
                <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/86 text-[#D77474] shadow-2xl">
                  <Play className="ml-1 h-8 w-8 fill-current" />
                </div>
              )}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38vh] bg-gradient-to-t from-black via-black/68 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-end justify-between gap-4">
                    <div className="min-w-0 text-white">
                      <h2 className="truncate text-lg font-semibold sm:text-xl">
                        {media.displayName}
                      </h2>
                      <p className="mt-2 truncate text-sm font-medium text-white/78">
                        {metaText}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-black/54 px-3 py-1.5 text-sm font-semibold text-white shadow-lg">
                      {Math.max(1, currentIndex)} / {Math.max(1, totalItems)}
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isNoteOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="rounded-[18px] border border-white/14 bg-black/54 p-3 backdrop-blur-md sm:max-w-[760px]"
                      >
                        <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <label
                            htmlFor="moodboard-note"
                            className="text-xs font-semibold uppercase tracking-[0.24em] text-white/72"
                          >
                            Moodboard Note
                          </label>
                          <span className="text-xs font-medium text-white/58">
                            Saved when you click Add to Moodboard
                          </span>
                        </div>
                        <textarea
                          id="moodboard-note"
                          value={note}
                          onChange={(event) => setNote(event.target.value)}
                          maxLength={1000}
                          placeholder="Example: Use white flowers instead of pink."
                          className="min-h-[92px] w-full resize-none rounded-[14px] border border-white/12 bg-white/94 px-4 py-3 text-sm leading-6 text-[#3B2928] outline-none placeholder:text-[#A0928F] focus:border-[#D77474] focus:ring-4 focus:ring-[#D77474]/20"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid gap-3 sm:grid-cols-[minmax(180px,0.8fr)_minmax(260px,1.2fr)_minmax(180px,0.8fr)] sm:max-w-[980px]">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsNoteOpen((current) => !current)}
                      className="h-12 rounded-[14px] border-white/10 bg-black/42 text-white shadow-lg hover:bg-white/12 hover:text-white"
                    >
                      <StickyNote className="h-4 w-4 text-[#FFD4CE]" />
                      Add Note
                    </Button>

                    <Button
                      type="button"
                      disabled={isAddingToMoodboard}
                      onClick={() => onAddToMoodboard(note)}
                      className="h-12 rounded-[14px] bg-[#E9717B] text-white shadow-[0_18px_42px_rgba(233,113,123,0.34)] hover:bg-[#D65F69]"
                    >
                      {isAddingToMoodboard ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                      Add to Moodboard
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 rounded-[14px] border-white/10 bg-black/42 text-white shadow-lg hover:bg-white/12 hover:text-white"
                    >
                      <Heart className="h-4 w-4 text-[#FFD4CE]" />
                      Favorite
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
