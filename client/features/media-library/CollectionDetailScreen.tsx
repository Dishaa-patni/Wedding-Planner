'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FolderPlus,
  Grid2X2,
  List,
  MoreVertical,
  Pencil,
  Play,
  Plus,
  Search,
  Trash2,
  Upload,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  CollectionDetailScreenSkeleton,
  CompactCollectionCardsSkeleton,
} from './components/MediaLibrarySkeletons'
import { NewCollectionModal } from './components/NewCollectionModal'
import { UploadMediaModal } from './components/UploadMediaModal'
import {
  useCollectionById,
  useCollections,
  useCreateCollection,
} from './hooks/use-media-library'

type CollectionDetailScreenProps = {
  collectionId: string
}

const subCollectionColors = [
  'bg-[#F1EAFB] text-[#9A79D9]',
  'bg-[#EAF6EC] text-[#699E73]',
  'bg-[#FFF0E4] text-[#D9924A]',
  'bg-[#E7F3FB] text-[#5F9DCC]',
]

const dummyMediaItems = [
  {
    id: 'theme-pastel-mandap',
    title: 'Pastel mandap',
    collection: 'Rental',
    updatedAt: 'now',
    type: 'JPG',
    url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'garden-lounge',
    title: 'Garden lounge setup',
    collection: 'Rental',
    updatedAt: 'now',
    type: 'JPG',
    url: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'mandap-closeup',
    title: 'Mandap closeup',
    collection: 'Rental',
    updatedAt: 'now',
    type: 'JPG',
    url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'walkway-ideas',
    title: 'Walkway ideas',
    collection: 'Rental',
    updatedAt: 'now',
    type: 'MP4',
    duration: '00:21',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'stage-backdrop',
    title: 'Stage backdrop',
    collection: 'Rental',
    updatedAt: 'now',
    type: 'JPG',
    url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'hanging-florals',
    title: 'Hanging florals',
    collection: 'Rental',
    updatedAt: '1h',
    type: 'JPG',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
  },
]

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

export default function CollectionDetailScreen({ collectionId }: CollectionDetailScreenProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'recent' | 'name'>('recent')
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [uploadedMediaCount, setUploadedMediaCount] = useState(0)

  const { data: collectionDetails, isLoading: isLoadingCollection } =
    useCollectionById(collectionId)
  const { data: subCollectionsData, isLoading: isLoadingSubCollections } =
    useCollections(collectionId)
  const { mutate: createCollection, isPending: isCreatingCollection } =
    useCreateCollection(collectionId)

  const collection = collectionDetails?.collection
  const breadcrumbs = collectionDetails?.breadcrumbs ?? []
  const subCollections = subCollectionsData?.collections ?? []
  const breadcrumbTrail =
    breadcrumbs.length > 0
      ? breadcrumbs
      : collection
        ? [{ id: collection._id, name: collection.name }]
        : []
  const collectionName = collection?.name ?? 'Collection'

  const filteredSubCollections = subCollections
    .filter((subCollection) =>
      subCollection.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
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

  const filteredMediaItems = dummyMediaItems.filter((mediaItem) => {
    const query = searchQuery.trim().toLowerCase()

    if (!query) return true

    return (
      mediaItem.title.toLowerCase().includes(query) ||
      mediaItem.collection.toLowerCase().includes(query) ||
      mediaItem.type.toLowerCase().includes(query)
    )
  })

  const handleCreateCollection = (name: string) => {
    createCollection(
      {
        name,
        parentCollectionId: collectionId,
      },
      {
        onSuccess: () => {
          setIsCollectionModalOpen(false)
        },
      },
    )
  }

  if (isLoadingCollection) {
    return <CollectionDetailScreenSkeleton />
  }

  return (
    <section className="mx-auto min-h-[calc(100dvh-72px)] w-full max-w-[1540px]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[#756967]">
            <button
              type="button"
              onClick={() => router.push('/media-library')}
              className="transition hover:text-[#3B2928]"
            >
              Media Library
            </button>
            {breadcrumbTrail.map((breadcrumb, index) => {
              const isLastBreadcrumb = index === breadcrumbTrail.length - 1

              return (
              <span key={breadcrumb.id} className="inline-flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-[#B9AAA6]" />
                <button
                  type="button"
                  onClick={() => {
                    if (!isLastBreadcrumb) {
                      router.push(`/media-library/collections/${breadcrumb.id}`)
                    }
                  }}
                  className={`transition ${
                    isLastBreadcrumb
                      ? 'cursor-default text-[#3B2928]'
                      : 'text-[#756967] hover:text-[#3B2928]'
                  }`}
                >
                  {breadcrumb.name}
                </button>
              </span>
              )
            })}
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#FFF5E2]">
              <FolderGlyph className="bg-[#D89A39]" />
            </div>
            <h1 className="font-sans text-3xl font-semibold leading-tight text-[#2E2E2E] sm:text-4xl">
              {collectionName}
            </h1>
            <button
              type="button"
              aria-label="Rename collection"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#756967] transition hover:bg-[#FFF0EE] hover:text-[#3B2928]"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-3 text-sm font-medium text-[#756967]">
            128 items <span className="px-2 text-[#D9C8C3]">.</span> 96 images{' '}
            <span className="px-2 text-[#D9C8C3]">.</span> 32 videos
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsUploadModalOpen(true)}
            className="h-11 rounded-full border-[#F0DDD8] bg-white px-5 text-[#3B2928] shadow-sm hover:border-[#E8B9B3] hover:bg-[#FFF7F4] hover:shadow-[0_12px_30px_rgba(183,110,121,0.12)]"
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
          <button
            type="button"
            aria-label="Collection page actions"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F0DDD8] bg-white text-[#756967] shadow-sm transition hover:bg-[#FFF0EE] hover:text-[#3B2928]"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 xl:flex-row xl:items-center">
        <label className="flex h-14 min-w-0 flex-1 items-center gap-3 rounded-[18px] border border-[#F0DDD8] bg-white/78 px-5 text-[#756967] shadow-sm">
          <Search className="h-5 w-5 shrink-0 text-[#8A7B78]" />
          <span className="sr-only">Search in {collectionName}</span>
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={`Search in ${collectionName}...`}
            className="min-w-0 flex-1 bg-transparent text-sm text-[#3B2928] outline-none placeholder:text-[#A0928F]"
          />
        </label>

        <Button
          type="button"
          variant="outline"
          className="h-14 shrink-0 justify-between rounded-[18px] border-[#F0DDD8] bg-white/78 px-5 text-[#3B2928] shadow-sm hover:bg-[#FFF7F4] xl:w-[150px]"
        >
          All Media
          <ChevronDown className="h-4 w-4 text-[#8A7B78]" />
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-14 shrink-0 justify-between rounded-[18px] border-[#F0DDD8] bg-white/78 px-5 text-[#3B2928] shadow-sm hover:bg-[#FFF7F4] xl:w-[150px]"
        >
          All Sources
          <ChevronDown className="h-4 w-4 text-[#8A7B78]" />
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => setSortBy((currentSort) => (currentSort === 'recent' ? 'name' : 'recent'))}
          className="h-14 shrink-0 justify-between rounded-[18px] border-[#F0DDD8] bg-white/78 px-5 text-[#3B2928] shadow-sm hover:bg-[#FFF7F4] xl:w-[165px]"
        >
          <span className="inline-flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-[#756967]" />
            {sortBy === 'recent' ? 'Newest First' : 'Name A-Z'}
          </span>
          <ChevronDown className="h-4 w-4 text-[#8A7B78]" />
        </Button>

        <div className="flex h-14 shrink-0 items-center rounded-[18px] border border-[#F0DDD8] bg-white/78 p-1 shadow-sm">
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

      <div className="mt-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-sans text-xl font-semibold text-[#2E2E2E]">
            Sub-collections <span className="text-[#8A7B78]">({subCollections.length})</span>
          </h2>
          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#D77474] transition hover:text-[#C96464]"
          >
            View all collections
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {isLoadingSubCollections ? (
            <CompactCollectionCardsSkeleton />
          ) : (
            filteredSubCollections.slice(0, 4).map((subCollection, index) => (
              <motion.div
                key={subCollection._id}
                role="button"
                tabIndex={0}
                onClick={() => router.push(`/media-library/collections/${subCollection._id}`)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    router.push(`/media-library/collections/${subCollection._id}`)
                  }
                }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="flex min-h-[84px] cursor-pointer items-center gap-4 rounded-[18px] border border-[#F0DDD8] bg-white/88 p-4 shadow-[0_14px_36px_rgba(183,110,121,0.08)] outline-none transition focus-visible:ring-4 focus-visible:ring-[#FFD4CE]/40"
              >
                <div
                  className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] ${
                    subCollectionColors[index % subCollectionColors.length]
                  }`}
                >
                  <FolderGlyph
                    className={
                      index === 0
                        ? 'bg-[#9A79D9]'
                        : index === 1
                          ? 'bg-[#699E73]'
                          : index === 2
                            ? 'bg-[#D9924A]'
                            : 'bg-[#5F9DCC]'
                    }
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-sans text-sm font-semibold text-[#2E2E2E]">
                    {subCollection.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#756967]">{32 - index * 4} items</p>
                </div>
              </motion.div>
            ))
          )}

          <button
            type="button"
            onClick={() => setIsCollectionModalOpen(true)}
            className="flex min-h-[84px] items-center justify-center gap-2 rounded-[18px] border border-dashed border-[#EFCAC5] bg-white/42 p-4 text-sm font-semibold text-[#D77474] transition hover:border-[#D77474] hover:bg-white/72"
          >
            <Plus className="h-4 w-4" />
            New Collection
          </button>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-sans text-xl font-semibold text-[#2E2E2E]">
            Media in {collectionName} <span className="text-[#8A7B78]">({filteredMediaItems.length + uploadedMediaCount})</span>
          </h2>
          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#756967] transition hover:text-[#3B2928]"
          >
            <span className="h-4 w-4 rounded border border-dashed border-[#8A7B78]" />
            Select
          </button>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6">
          {filteredMediaItems.map((mediaItem) => (
            <motion.article
              key={mediaItem.id}
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-[18px] border border-[#F0DDD8] bg-white/90 shadow-[0_16px_44px_rgba(183,110,121,0.08)] transition"
            >
              <div className="relative aspect-[1.42] overflow-hidden bg-[#FFF0EE]">
                <img
                  src={mediaItem.url}
                  alt={mediaItem.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute bottom-3 left-3 rounded-[10px] bg-white px-3 py-1.5 text-xs font-bold tracking-wide text-[#3B2928] shadow-[0_8px_20px_rgba(59,41,40,0.18)] ring-1 ring-white/70">
                  {mediaItem.type}
                </span>

                {mediaItem.duration && (
                  <>
                    <span className="absolute right-3 top-3 rounded-full bg-[#2E2E2E]/82 px-2.5 py-1 text-xs font-semibold text-white">
                      {mediaItem.duration}
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
                    {mediaItem.title}
                  </h3>
                  <p className="mt-2 truncate text-sm text-[#8A7B78]">
                    {mediaItem.collection} <span className="px-1">.</span> {mediaItem.updatedAt}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label={`Delete ${mediaItem.title}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#D77474] transition hover:bg-[#FFF0EE] hover:text-[#C64F55]"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mx-auto mt-10 flex w-fit items-center gap-2 rounded-[18px] border border-[#F0DDD8] bg-white/76 p-1 shadow-sm">
          <button
            type="button"
            aria-label="Previous page"
            className="flex h-10 min-w-10 items-center justify-center rounded-[14px] text-[#756967] transition hover:bg-[#FFF7F4] hover:text-[#3B2928]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {['1', '2', '3', '...', '12'].map((page) => (
            <button
              key={page}
              type="button"
              className={`flex h-10 min-w-10 items-center justify-center rounded-[14px] px-3 text-sm font-semibold ${
                page === '1'
                  ? 'bg-[#FFF0EE] text-[#D77474]'
                  : 'text-[#756967] hover:bg-[#FFF7F4]'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            aria-label="Next page"
            className="flex h-10 min-w-10 items-center justify-center rounded-[14px] text-[#756967] transition hover:bg-[#FFF7F4] hover:text-[#3B2928]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <NewCollectionModal
        open={isCollectionModalOpen}
        onClose={() => setIsCollectionModalOpen(false)}
        onCreate={handleCreateCollection}
        existingCollectionNames={subCollections.map((subCollection) => subCollection.name)}
        isCreating={isCreatingCollection}
      />
      <UploadMediaModal
        open={isUploadModalOpen}
        collections={subCollections}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadComplete={(fileCount) =>
          setUploadedMediaCount((currentCount) => currentCount + fileCount)
        }
        onRequestCollection={() => {
          setIsUploadModalOpen(false)
          window.setTimeout(() => setIsCollectionModalOpen(true), 80)
        }}
      />
    </section>
  )
}
