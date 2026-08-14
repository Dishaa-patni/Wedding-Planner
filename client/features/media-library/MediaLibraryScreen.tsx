'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileImage,
  FolderPlus,
  Grid2X2,
  Image as ImageIcon,
  ImagePlus,
  List,
  MoreVertical,
  Pencil,
  Play,
  Search,
  Trash2,
  Upload,
  Video,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { appToast } from '@/components/ui/app-toaster'
import { useWeddingWorkspace } from '@/features/wedding-workspace/use-wedding-workspace'
import type { Collection, MediaLibraryItem } from './media-library.types'
import { DeleteCollectionModal } from './components/DeleteCollectionModal'
import { MediaCardsSkeleton, MediaLibraryScreenSkeleton } from './components/MediaLibrarySkeletons'
import { MediaPresentationModal } from './components/MediaPresentationModal'
import { NewCollectionModal } from './components/NewCollectionModal'
import { RenameCollectionModal } from './components/RenameCollectionModal'
import { UploadMediaModal } from './components/UploadMediaModal'
import {
  useAddMoodboardItem,
  useCollections,
  useCreateCollection,
  useDeleteCollection,
  useDeleteMedia,
  useMedia,
  useUpdateCollection,
  useUploadMedia,
} from './hooks/use-media-library'

type MediaLibraryScreenProps = {
  parentCollectionId?: string | null
}

type CollectionActionTarget = {
  collection: Collection
  collectionIndex: number
}

const collectionColorClasses = [
  'bg-[#FFF0EE]',
  'bg-[#FFF5E2]',
  'bg-[#F1EAFB]',
  'bg-[#EAF6EC]',
  'bg-[#FFF0E4]',
  'bg-[#E7F3FB]',
]

const collectionFolderClasses = [
  'bg-[#D77474]',
  'bg-[#D89A39]',
  'bg-[#9A79D9]',
  'bg-[#699E73]',
  'bg-[#D9924A]',
  'bg-[#5F9DCC]',
]

const getCollectionMeta = (index: number) => {
  const imageCounts = [128, 104, 70, 76, 58, 46]
  const videoCounts = [12, 8, 7, 10, 6, 4]
  const updates = ['Updated yesterday', 'Updated 2 days ago', 'Updated 3 days ago']

  return {
    images: imageCounts[index % imageCounts.length],
    videos: videoCounts[index % videoCounts.length],
    updatedAt: updates[index % updates.length],
  }
}

function FolderGlyph({ className }: { className: string }) {
  return (
    <span className="relative block h-8 w-9" aria-hidden="true">
      <span className={`absolute left-1 top-1 h-2.5 w-4 rounded-t-[4px] ${className}`} />
      <span
        className={`absolute inset-x-0 bottom-0 h-6 rounded-[7px] shadow-[inset_0_2px_0_rgba(255,255,255,0.42)] ${className}`}
      />
    </span>
  )
}

const getMediaLabel = (mediaItem: MediaLibraryItem) => {
  const extension = mediaItem.originalName.split('.').pop()

  if (extension) return extension.toUpperCase()

  return mediaItem.type === 'video' ? 'MP4' : 'JPG'
}

const getMediaCollectionLabel = (mediaItem: MediaLibraryItem) => {
  if (!mediaItem.collectionId) return 'All Media'

  if (typeof mediaItem.collectionId === 'object') {
    return mediaItem.collectionId.name
  }

  return 'Collection'
}

const formatRelativeDate = (dateValue: string) => {
  const updatedAt = new Date(dateValue).getTime()

  if (Number.isNaN(updatedAt)) return 'recently'

  const elapsedMs = Date.now() - updatedAt
  const elapsedMinutes = Math.max(0, Math.floor(elapsedMs / 60000))

  if (elapsedMinutes < 1) return 'now'
  if (elapsedMinutes < 60) return `${elapsedMinutes}m ago`

  const elapsedHours = Math.floor(elapsedMinutes / 60)
  if (elapsedHours < 24) return `${elapsedHours}h ago`

  const elapsedDays = Math.floor(elapsedHours / 24)
  if (elapsedDays === 1) return 'yesterday'
  if (elapsedDays < 7) return `${elapsedDays} days ago`

  const elapsedWeeks = Math.floor(elapsedDays / 7)
  return elapsedWeeks === 1 ? '1 week ago' : `${elapsedWeeks} weeks ago`
}

const getPaginationItems = (currentPage: number, totalPages: number) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages = new Set([1, currentPage - 1, currentPage, currentPage + 1, totalPages])
  const sortedPages = Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((firstPage, secondPage) => firstPage - secondPage)

  return sortedPages.flatMap((page, index) => {
    const previousPage = sortedPages[index - 1]

    if (previousPage && page - previousPage > 1) {
      return [`gap-${previousPage}-${page}`, page]
    }

    return [page]
  })
}

const collectionRowVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 42 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -42 }),
}

export default function MediaLibraryScreen({ parentCollectionId }: MediaLibraryScreenProps) {
  const currentParentCollectionId = parentCollectionId ?? null
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeWeddingId = searchParams.get('weddingId')
  const { data: activeWeddingWorkspace } = useWeddingWorkspace(activeWeddingId ?? '')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'recent' | 'name'>('recent')

  const [collectionPageDirection, setCollectionPageDirection] = useState(1)
  const [openCollectionMenuId, setOpenCollectionMenuId] = useState<string | null>(null)
  const [renameTarget, setRenameTarget] = useState<CollectionActionTarget | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<CollectionActionTarget | null>(null)
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [collectionPage, setCollectionPage] = useState(1)
  const [mediaPage, setMediaPage] = useState(1)
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null)
  const [pendingPresentationDirection, setPendingPresentationDirection] = useState<
    'previous' | 'next' | null
  >(null)
  const collectionsPerPage = 4
  const mediaPerPage = 10

  const { data: collectionsData, isLoading: isLoadingCollections } =
    useCollections(currentParentCollectionId, collectionPage, collectionsPerPage)
  const { data: mediaData, isLoading: isLoadingMedia } =
    useMedia(currentParentCollectionId, mediaPage, mediaPerPage)

  const { mutate: createCollection, isPending: isCreatingCollection } =
    useCreateCollection(currentParentCollectionId)
  const { mutateAsync: uploadMedia, isPending: isUploadingMedia } =
    useUploadMedia(currentParentCollectionId)

  const { mutate: updateCollection, isPending: isUpdatingCollection } =
    useUpdateCollection(currentParentCollectionId)
  const { mutate: deleteCollection, isPending: isDeletingCollection } =
    useDeleteCollection(currentParentCollectionId)
  const { mutate: deleteMedia, isPending: isDeletingMedia } =
    useDeleteMedia(currentParentCollectionId)
  const { mutate: addMoodboardItem, isPending: isAddingToMoodboard } = useAddMoodboardItem()

  const displayCollections = collectionsData?.collections ?? []
  const collectionMeta = collectionsData?.meta
  const displayMediaItems = mediaData?.media ?? []
  const mediaMeta = mediaData?.meta
  const currentCollectionPage = collectionMeta?.page ?? collectionPage
  const collectionPageCount = Math.max(1, collectionMeta?.totalPages ?? 1)
  const currentMediaPage = mediaMeta?.page ?? mediaPage
  const mediaPageCount = Math.max(1, mediaMeta?.totalPages ?? 1)
  const hasLibraryItems = displayCollections.length > 0 || displayMediaItems.length > 0
  const isInitialLibraryLoading = isLoadingCollections || isLoadingMedia

  const filteredCollections = displayCollections
    .filter((collection) =>
      collection.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
    )
    .sort((firstCollection, secondCollection) => {
      if (sortBy === 'name') {
        return firstCollection.name.localeCompare(secondCollection.name)
      }

      return (
        new Date(secondCollection.updatedAt).getTime() -
        new Date(firstCollection.updatedAt).getTime()
      )
    })

  const filteredMediaItems = displayMediaItems.filter((mediaItem) => {
    const query = searchQuery.trim().toLowerCase()

    if (!query) return true

    return (
      mediaItem.displayName.toLowerCase().includes(query) ||
      mediaItem.originalName.toLowerCase().includes(query) ||
      mediaItem.type.toLowerCase().includes(query)
    )
  })

  const visibleCollections = filteredCollections
  const canGoToPreviousCollections = collectionMeta?.hasPreviousPage ?? false
  const canGoToNextCollections = collectionMeta?.hasNextPage ?? false
  const canShowCollectionPagination = collectionPageCount > 1
  const canGoToPreviousMedia = mediaMeta?.hasPreviousPage ?? false
  const canGoToNextMedia = mediaMeta?.hasNextPage ?? false
  const canShowMediaPagination = mediaPageCount > 1

  const deleteTargetMeta = deleteTarget ? getCollectionMeta(deleteTarget.collectionIndex) : null
  const selectedMediaIndex = filteredMediaItems.findIndex(
    (mediaItem) => mediaItem._id === selectedMediaId,
  )
  const selectedMedia = selectedMediaIndex >= 0 ? filteredMediaItems[selectedMediaIndex] : null
  const presentationIndex =
    selectedMediaIndex >= 0 ? (currentMediaPage - 1) * mediaPerPage + selectedMediaIndex + 1 : 0
  const presentationTotalItems = mediaMeta?.totalItems ?? filteredMediaItems.length
  const canGoToPreviousPresentation = selectedMediaIndex > 0 || canGoToPreviousMedia
  const canGoToNextPresentation =
    selectedMediaIndex >= 0 &&
    (selectedMediaIndex < filteredMediaItems.length - 1 || canGoToNextMedia)

  const handleCreateCollection = (name: string) => {
    createCollection(
      {
        name,
        parentCollectionId: currentParentCollectionId,
      },
      {
        onSuccess: () => {
          setIsCollectionModalOpen(false)
        },
      },
    )
  }

const goToPreviousCollections = () => {
  if (!canGoToPreviousCollections) return
  setCollectionPageDirection(-1)
  setCollectionPage((currentPage) => currentPage - 1)
}

const goToNextCollections = () => {
  if (!canGoToNextCollections) return
  setCollectionPageDirection(1)
  setCollectionPage((currentPage) => currentPage + 1)
}

  const goToPreviousMedia = () => {
    if (!canGoToPreviousMedia) return
    setMediaPage((currentPage) => currentPage - 1)
  }

  const goToNextMedia = () => {
    if (!canGoToNextMedia) return
    setMediaPage((currentPage) => currentPage + 1)
  }

  const goToPreviousPresentation = () => {
    if (!selectedMedia) return

    if (selectedMediaIndex > 0) {
      setSelectedMediaId(filteredMediaItems[selectedMediaIndex - 1]._id)
      return
    }

    if (canGoToPreviousMedia) {
      setPendingPresentationDirection('previous')
      setMediaPage((currentPage) => currentPage - 1)
    }
  }

  const goToNextPresentation = () => {
    if (!selectedMedia) return

    if (selectedMediaIndex < filteredMediaItems.length - 1) {
      setSelectedMediaId(filteredMediaItems[selectedMediaIndex + 1]._id)
      return
    }

    if (canGoToNextMedia) {
      setPendingPresentationDirection('next')
      setMediaPage((currentPage) => currentPage + 1)
    }
  }

  const handleUploadMedia = (files: File[], collectionId: string | null) => {
    Promise.all(files.map((file) => uploadMedia({ file, collectionId })))
      .then(() => setIsUploadModalOpen(false))
      .catch(() => {
        // Toast handling lives in the upload mutation.
      })
  }

  const handleAddMediaToMoodboard = (note: string) => {
    if (!selectedMedia) return

    if (!activeWeddingId) {
      appToast.error({
        description: 'Open the media library from a wedding moodboard first.',
      })
      return
    }

    addMoodboardItem(
      {
        weddingId: activeWeddingId,
        weddingWorkspaceName: activeWeddingWorkspace?.name,
        mediaId: selectedMedia._id,
        note: note.trim() || undefined,
      },
      {
        onSuccess: () => {
          setSelectedMediaId(null)
        },
      },
    )
  }

  const handleRenameCollection = (name: string) => {
    if (!renameTarget) return

    updateCollection(
      {
        collectionId: renameTarget.collection._id,
        name,
      },
      {
        onSuccess: () => setRenameTarget(null),
      },
    )
  }

  const handleDeleteCollection = () => {
    if (!deleteTarget) return

    deleteCollection(deleteTarget.collection._id, {
      onSuccess: () => {
        setOpenCollectionMenuId(null)
        setDeleteTarget(null)
      },
    })
  }

  const handleDeleteMedia = (mediaId: string) => {
    deleteMedia(mediaId, {
      onSuccess: () => {
        if (selectedMediaId === mediaId) {
          setSelectedMediaId(null)
        }
      },
    })
  }

  useEffect(() => {
    if (!openCollectionMenuId) return

    const handlePointerDown = () => setOpenCollectionMenuId(null)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenCollectionMenuId(null)
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [openCollectionMenuId])

  useEffect(() => {
    setCollectionPage(1)
  }, [searchQuery, sortBy])

  useEffect(() => {
    if (!pendingPresentationDirection || filteredMediaItems.length === 0) return

    const nextMedia =
      pendingPresentationDirection === 'next'
        ? filteredMediaItems[0]
        : filteredMediaItems[filteredMediaItems.length - 1]

    setSelectedMediaId(nextMedia._id)
    setPendingPresentationDirection(null)
  }, [filteredMediaItems, pendingPresentationDirection])

  return (
    <section className="mx-auto min-h-[calc(100dvh-72px)] w-full max-w-[1540px]">
      <div className="min-w-0">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.36em] text-[#D77474]">
              Creative Workspace
            </p>
            <h1 className="mt-2 font-display text-4xl leading-tight text-[#3B2928] sm:text-5xl">
              Media Library
            </h1>
            {hasLibraryItems && (
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#756967] sm:text-base">
                Organize and manage all your inspiration in one place.
              </p>
            )}
          </div>

          {hasLibraryItems && (
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsUploadModalOpen(true)}
                className="h-11 rounded-full border-[#F0DDD8] bg-white px-5 text-[#3B2928] shadow-sm hover:bg-[#FFF0EE]"
              >
                <Upload className="h-4 w-4 text-[#D77474]" />
                Upload Media
              </Button>
              <Button
                type="button"
                onClick={() => setIsCollectionModalOpen(true)}
                className="h-11 rounded-full bg-[#D77474] px-5 text-white shadow-[0_18px_40px_rgba(215,116,116,0.24)] hover:bg-[#C96464]"
              >
                <FolderPlus className="h-4 w-4" />
                New Collection
              </Button>
            </div>
          )}
        </div>

        {isInitialLibraryLoading ? (
          <MediaLibraryScreenSkeleton />
        ) : !hasLibraryItems ? (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="mx-auto mt-20 flex min-h-[560px] w-full max-w-[1180px] items-center justify-center overflow-hidden rounded-[32px] border border-[#F0DDD8] bg-white/78 px-6 py-10 shadow-[0_24px_80px_rgba(183,110,121,0.12)] sm:px-10"
          >
            <div className="relative mx-auto flex max-w-[660px] flex-col items-center text-center">
              <div className="pointer-events-none absolute -top-16 h-72 w-72 rounded-full bg-[#FFD4CE]/28 blur-3xl" />
              <div className="pointer-events-none absolute top-12 h-40 w-[520px] rounded-full bg-[#F7E4D8]/40 blur-3xl" />

              <div className="relative h-40 w-44">
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [-5, -2, -5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-6 top-8 flex h-28 w-28 items-center justify-center rounded-[30px] bg-[#FFD4CE] text-white shadow-[0_24px_60px_rgba(215,116,116,0.22)]"
                >
                  <ImageIcon className="h-12 w-12" strokeWidth={1.6} />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 7, 0], x: [0, 4, 0] }}
                  transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute right-3 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#D8B26E] shadow-[0_12px_34px_rgba(183,110,121,0.12)] ring-1 ring-[#F0DDD8]"
                >
                  <ImagePlus className="h-5 w-5" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [0, 4, 0] }}
                  transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-8 left-2 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#D77474] shadow-[0_12px_34px_rgba(183,110,121,0.12)] ring-1 ring-[#F0DDD8]"
                >
                  <FolderPlus className="h-5 w-5" />
                </motion.div>
              </div>

              <h2 className="relative font-display text-4xl leading-tight text-[#3B2928] sm:text-5xl">
                Build Your Inspiration Library
              </h2>
              <p className="relative mt-4 max-w-[540px] text-sm leading-6 text-[#756967] sm:text-base">
                Create collections and upload images or videos to organize your wedding
                inspirations, references, and moodboards for future events.
              </p>

              <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  type="button"
                  onClick={() => setIsCollectionModalOpen(true)}
                  className="h-12 rounded-full bg-[#D77474] px-7 text-white shadow-[0_18px_40px_rgba(215,116,116,0.24)] hover:bg-[#C96464]"
                >
                  <FolderPlus className="h-4 w-4" />
                  New Collection
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="h-12 rounded-full border-[#F0DDD8] bg-white px-7 text-[#3B2928] shadow-sm hover:bg-[#FFF0EE]"
                >
                  <Upload className="h-4 w-4 text-[#D77474]" />
                  Upload Media
                </Button>
              </div>

              <p className="relative mt-8 text-[12px] font-semibold uppercase tracking-[0.34em] text-[#A0928F]">
                Images and Videos - Organized By Collection
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="mt-8">
            <div className="grid gap-3 xl:grid-cols-[minmax(360px,1fr)_auto_auto_auto_auto]">
              <label className="flex h-14 min-w-0 items-center gap-3 rounded-[18px] border border-[#F0DDD8] bg-white/78 px-5 text-[#756967] shadow-sm">
                <Search className="h-5 w-5 shrink-0 text-[#8A7B78]" />
                <span className="sr-only">Search media library</span>
                <input
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value)
                    setCollectionPage(1)
                    setMediaPage(1)
                  }}
                  placeholder="Search media by name, type or collection..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-[#3B2928] outline-none placeholder:text-[#A0928F]"
                />
              </label>

              <Button
                type="button"
                variant="outline"
                className="h-14 justify-between rounded-[18px] border-[#F0DDD8] bg-white/78 px-5 text-[#3B2928] shadow-sm hover:bg-[#FFF0EE] xl:w-[150px]"
              >
                All Media
                <ChevronDown className="h-4 w-4 text-[#8A7B78]" />
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-14 justify-between rounded-[18px] border-[#F0DDD8] bg-white/78 px-5 text-[#3B2928] shadow-sm hover:bg-[#FFF0EE] xl:w-[180px]"
              >
                All Collections
                <ChevronDown className="h-4 w-4 text-[#8A7B78]" />
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSortBy((currentSort) => (currentSort === 'recent' ? 'name' : 'recent'))
                  setCollectionPage(1)
                }}
                className="h-14 justify-between rounded-[18px] border-[#F0DDD8] bg-white/78 px-5 text-[#3B2928] shadow-sm hover:bg-[#FFF0EE] xl:w-[170px]"
              >
                <span className="inline-flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-[#756967]" />
                  {sortBy === 'recent' ? 'Newest First' : 'Name A-Z'}
                </span>
                <ChevronDown className="h-4 w-4 text-[#8A7B78]" />
              </Button>

              <div className="flex h-14 items-center rounded-[18px] border border-[#F0DDD8] bg-white/78 p-1 shadow-sm">
                <button
                  type="button"
                  aria-label="Grid view"
                  className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#FFF0EE] text-[#D77474]"
                >
                  <Grid2X2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="List view"
                  className="flex h-11 w-11 items-center justify-center rounded-[14px] text-[#756967] transition hover:bg-[#FFF7F4]"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-9">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-sans text-xl font-semibold text-[#2E2E2E]">
                  Collections{' '}
                  <span className="text-[#8A7B78]">
                    ({collectionMeta?.totalItems ?? filteredCollections.length})
                  </span>
                </h2>
                <div className="flex items-center gap-4">
                  {canShowCollectionPagination && (
                    <span className="text-sm font-medium text-[#8A7B78]">
                      {currentCollectionPage} of {collectionPageCount}
                    </span>
                  )}
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#D77474] transition hover:text-[#C96464]"
                  >
                    View all collections
                    <ChevronDown className="-rotate-90 h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="relative mt-5">
                {canShowCollectionPagination && (
                  <button
                    type="button"
                    aria-label="Previous collections"
                    disabled={!canGoToPreviousCollections}
                    onClick={goToPreviousCollections}
                    className="absolute -left-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#F0DDD8] bg-white text-[#756967] shadow-[0_12px_30px_rgba(59,41,40,0.12)] transition hover:bg-[#FFF0EE] hover:text-[#3B2928] disabled:pointer-events-none disabled:opacity-35"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                )}

                <div className="overflow-visible">
                  <AnimatePresence custom={collectionPageDirection} initial={false} mode="wait">
                    <motion.div
                      key={currentCollectionPage}
                      custom={collectionPageDirection}
                      variants={collectionRowVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
                    >
                      {visibleCollections.map((collection, index) => {
                        const collectionIndex =
                          (currentCollectionPage - 1) * collectionsPerPage + index
                        const meta = getCollectionMeta(collectionIndex)
                        const totalItems = meta.images + meta.videos
                        const isMenuOpen = openCollectionMenuId === collection._id

                        return (
                          <motion.div
                            key={collection._id}
                            role="button"
                            tabIndex={0}
                            onClick={() =>
                              router.push(`/media-library/collections/${collection._id}`)
                            }
                            onKeyDown={(event) => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault()
                                router.push(`/media-library/collections/${collection._id}`)
                              }
                            }}
                            whileHover={{ y: -3, scale: 1.008 }}
                            className={`group relative min-h-[146px] cursor-pointer rounded-[22px] border border-[#F0DDD8] bg-white/88 p-4 text-left shadow-[0_14px_34px_rgba(183,110,121,0.08)] outline-none transition focus-visible:ring-4 focus-visible:ring-[#FFD4CE]/40 ${
                              isMenuOpen ? 'z-30' : 'z-0'
                            }`}
                          >
                            <button
                              type="button"
                              aria-label={`Collection actions for ${collection.name}`}
                              onClick={(event) => {
                                event.stopPropagation()
                                setOpenCollectionMenuId((currentId) =>
                                  currentId === collection._id ? null : collection._id,
                                )
                              }}
                              className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-[#756967] transition hover:bg-[#FFF0EE] hover:text-[#3B2928] group-hover:opacity-100 ${
                                isMenuOpen ? 'bg-[#FFF0EE] opacity-100' : 'opacity-0'
                              }`}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </button>

                            <AnimatePresence>
                              {isMenuOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                                  transition={{ duration: 0.16, ease: 'easeOut' }}
                                  onClick={(event) => event.stopPropagation()}
                                  className="absolute right-3 top-12 z-40 w-[156px] rounded-[14px] border border-[#F0DDD8] bg-white p-2 shadow-[0_18px_42px_rgba(59,41,40,0.14)]"
                                >
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setRenameTarget({ collection, collectionIndex })
                                      setOpenCollectionMenuId(null)
                                    }}
                                    className="flex h-10 w-full items-center gap-3 rounded-[10px] px-3 text-sm font-medium text-[#3B2928] transition hover:bg-[#FFF4F2]"
                                  >
                                    <Pencil className="h-4 w-4 text-[#3B2928]" />
                                    Rename
                                  </button>
                                  <div className="my-1 h-px bg-[#F0DDD8]" />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setDeleteTarget({ collection, collectionIndex })
                                      setOpenCollectionMenuId(null)
                                    }}
                                    className="flex h-10 w-full items-center gap-3 rounded-[10px] px-3 text-sm font-medium text-[#3B2928] transition hover:bg-[#FFF0EE] hover:text-[#C96464] [&:hover_svg]:text-[#C96464]"
                                  >
                                    <Trash2 className="h-4 w-4 text-[#D77474] transition" />
                                    Delete
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <div
                              className={`flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full ${
                                collectionColorClasses[
                                  collectionIndex % collectionColorClasses.length
                                ]
                              }`}
                            >
                              <FolderGlyph
                                className={
                                  collectionFolderClasses[
                                    collectionIndex % collectionFolderClasses.length
                                  ]
                                }
                              />
                            </div>

                            <div className="mt-4 min-w-0">
                              <h3 className="truncate font-sans text-base font-semibold text-[#2E2E2E]">
                                {collection.name}
                              </h3>

                              <p className="mt-1.5 text-sm font-medium text-[#756967]">
                                {totalItems} items
                              </p>

                              <div className="mt-3 grid grid-cols-[auto_auto_auto] items-center gap-x-3 text-[13px] font-medium text-[#756967]">
                                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                                  <FileImage className="h-3.5 w-3.5 shrink-0 text-[#8A7B78]" />
                                  {meta.images} images
                                </span>
                                <span className="text-[#D9C8C3]">.</span>
                                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                                  <Video className="h-3.5 w-3.5 shrink-0 text-[#8A7B78]" />
                                  {meta.videos} videos
                                </span>
                              </div>

                              <div className="mt-2.5 flex items-center gap-1.5 text-[13px] text-[#756967]">
                                <Clock3 className="h-3.5 w-3.5 text-[#8A7B78]" />
                                <span>{meta.updatedAt}</span>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {visibleCollections.length === 0 && (
                  <div className="rounded-[22px] border border-dashed border-[#F0DDD8] bg-white/60 px-6 py-10 text-center text-sm font-medium text-[#756967]">
                    No collections match your search.
                  </div>
                )}

                {canShowCollectionPagination && (
                  <button
                    type="button"
                    aria-label="Next collections"
                    disabled={!canGoToNextCollections}
                    onClick={goToNextCollections}
                    className="absolute -right-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#F0DDD8] bg-white text-[#756967] shadow-[0_12px_30px_rgba(59,41,40,0.12)] transition hover:bg-[#FFF0EE] hover:text-[#3B2928] disabled:pointer-events-none disabled:opacity-35"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="mt-10">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-sans text-xl font-semibold text-[#2E2E2E]">
                  All Media{' '}
                  <span className="text-[#8A7B78]">
                    ({mediaMeta?.totalItems ?? filteredMediaItems.length})
                  </span>
                </h2>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#756967] transition hover:text-[#3B2928]"
                >
                  <span className="h-4 w-4 rounded border border-dashed border-[#8A7B78]" />
                  Select
                </button>
              </div>

              {isLoadingMedia ? (
                <div className="mt-5">
                  <MediaCardsSkeleton count={mediaPerPage} />
                </div>
              ) : filteredMediaItems.length > 0 ? (
                <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
                {filteredMediaItems.map((mediaItem) => (
                  <motion.article
                    key={mediaItem._id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedMediaId(mediaItem._id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        setSelectedMediaId(mediaItem._id)
                      }
                    }}
                    whileHover={{ y: -4 }}
                    className="group cursor-pointer overflow-hidden rounded-[18px] border border-[#F0DDD8] bg-white/90 shadow-[0_16px_44px_rgba(183,110,121,0.08)] outline-none transition focus-visible:ring-4 focus-visible:ring-[#FFD4CE]/40"
                  >
                    <div className="relative aspect-[1.5] overflow-hidden bg-[#FFF0EE]">
                      <img
                        src={mediaItem.url}
                        alt={mediaItem.displayName}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <span className="absolute bottom-3 left-3 rounded-[10px] bg-white px-3 py-1.5 text-xs font-bold tracking-wide text-[#3B2928] shadow-[0_8px_20px_rgba(59,41,40,0.18)] ring-1 ring-white/70">
                        {getMediaLabel(mediaItem)}
                      </span>

                      {mediaItem.type === 'video' && (
                        <>
                          <span className="absolute right-3 top-3 rounded-full bg-[#2E2E2E]/82 px-2.5 py-1 text-xs font-semibold text-white">
                            Video
                          </span>
                          <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#2E2E2E]/62 text-white backdrop-blur-sm">
                            <Play className="ml-0.5 h-5 w-5 fill-current" />
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-3 p-4">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-[#2E2E2E]">
                          {mediaItem.displayName}
                        </h3>
                        <p className="mt-2 truncate text-sm text-[#8A7B78]">
                          {getMediaCollectionLabel(mediaItem)}{' '}
                          <span className="px-1">.</span>
                          {formatRelativeDate(mediaItem.updatedAt)}
                        </p>
                      </div>

                      <button
                        type="button"
                        aria-label={`Delete ${mediaItem.displayName}`}
                        disabled={isDeletingMedia}
                        onClick={(event) => {
                          event.stopPropagation()
                          handleDeleteMedia(mediaItem._id)
                        }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#D77474] transition hover:bg-[#FFF0EE] hover:text-[#C64F55] disabled:pointer-events-none disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.article>
                ))}
                </div>
              ) : (
                <div className="mt-5 rounded-[22px] border border-dashed border-[#F0DDD8] bg-white/60 px-6 py-10 text-center text-sm font-medium text-[#756967]">
                  No media found.
                </div>
              )}

              {canShowMediaPagination && (
                <div className="mx-auto mt-10 flex w-fit items-center gap-2 rounded-[18px] border border-[#F0DDD8] bg-white/76 p-1 shadow-sm">
                <button
                  type="button"
                  aria-label="Previous page"
                  disabled={!canGoToPreviousMedia}
                  onClick={goToPreviousMedia}
                  className="flex h-10 min-w-10 items-center justify-center rounded-[14px] text-[#756967] transition hover:bg-[#FFF7F4] hover:text-[#3B2928] disabled:pointer-events-none disabled:opacity-35"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {getPaginationItems(currentMediaPage, mediaPageCount).map((page) => (
                  <button
                    key={page}
                    type="button"
                    disabled={typeof page === 'string'}
                    onClick={() => {
                      if (typeof page === 'number') setMediaPage(page)
                    }}
                    className={`flex h-10 min-w-10 items-center justify-center rounded-[14px] px-3 text-sm font-semibold ${
                      page === currentMediaPage
                        ? 'bg-[#FFF0EE] text-[#D77474]'
                        : 'text-[#756967] hover:bg-[#FFF7F4]'
                    }`}
                  >
                    {typeof page === 'number' ? page : '...'}
                  </button>
                ))}
                <button
                  type="button"
                  aria-label="Next page"
                  disabled={!canGoToNextMedia}
                  onClick={goToNextMedia}
                  className="flex h-10 min-w-10 items-center justify-center rounded-[14px] text-[#756967] transition hover:bg-[#FFF7F4] hover:text-[#3B2928] disabled:pointer-events-none disabled:opacity-35"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              )}
            </div>
          </div>
        )}
      </div>

      <NewCollectionModal
        open={isCollectionModalOpen}
        onClose={() => setIsCollectionModalOpen(false)}
        onCreate={handleCreateCollection}
        existingCollectionNames={displayCollections.map((collection) => collection.name)}
        isCreating={isCreatingCollection}
      />
      <RenameCollectionModal
        open={Boolean(renameTarget)}
        collectionName={renameTarget?.collection.name ?? ''}
        existingCollectionNames={displayCollections.map((collection) => collection.name)}
        onClose={() => setRenameTarget(null)}
        onRename={handleRenameCollection}
        isRenaming={isUpdatingCollection}
      />
      <DeleteCollectionModal
        open={Boolean(deleteTarget)}
        collectionName={deleteTarget?.collection.name ?? ''}
        imageCount={deleteTargetMeta?.images ?? 0}
        videoCount={deleteTargetMeta?.videos ?? 0}
        onClose={() => setDeleteTarget(null)}
        onDelete={handleDeleteCollection}
        isDeleting={isDeletingCollection}
      />
      <UploadMediaModal
        open={isUploadModalOpen}
        collections={displayCollections}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadComplete={handleUploadMedia}
        isUploading={isUploadingMedia}
        onRequestCollection={() => {
          setIsUploadModalOpen(false)
          window.setTimeout(() => setIsCollectionModalOpen(true), 80)
        }}
      />
      <MediaPresentationModal
        open={Boolean(selectedMedia)}
        media={selectedMedia}
        currentIndex={presentationIndex}
        totalItems={presentationTotalItems}
        canGoPrevious={canGoToPreviousPresentation}
        canGoNext={canGoToNextPresentation}
        isAddingToMoodboard={isAddingToMoodboard}
        onClose={() => setSelectedMediaId(null)}
        onPrevious={goToPreviousPresentation}
        onNext={goToNextPresentation}
        onAddToMoodboard={handleAddMediaToMoodboard}
      />
    </section>
  )
}
