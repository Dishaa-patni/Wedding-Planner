import { Skeleton } from '@/components/ui/skeleton'

const shimmer = 'bg-[#F6DDE1]/55'

type SkeletonCountProps = {
  count?: number
}

export function CollectionCardSkeleton() {
  return (
    <div className="min-h-[146px] rounded-[22px] border border-[#F0DDD8] bg-white/72 p-4 shadow-[0_14px_34px_rgba(183,110,121,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <Skeleton className={`h-[54px] w-[54px] rounded-full ${shimmer}`} />
        <Skeleton className={`h-7 w-7 rounded-full ${shimmer}`} />
      </div>

      <div className="mt-4 space-y-3">
        <Skeleton className={`h-5 w-28 rounded-full ${shimmer}`} />
        <Skeleton className={`h-4 w-20 rounded-full ${shimmer}`} />
        <div className="flex items-center gap-4 pt-1">
          <Skeleton className={`h-4 w-24 rounded-full ${shimmer}`} />
          <Skeleton className={`h-4 w-20 rounded-full ${shimmer}`} />
        </div>
        <Skeleton className={`h-4 w-36 rounded-full ${shimmer}`} />
      </div>
    </div>
  )
}

export function CompactCollectionCardSkeleton() {
  return (
    <div className="flex min-h-[84px] items-center gap-4 rounded-[18px] border border-[#F0DDD8] bg-white/78 p-4 shadow-[0_14px_36px_rgba(183,110,121,0.06)]">
      <Skeleton className={`h-[52px] w-[52px] shrink-0 rounded-[14px] ${shimmer}`} />
      <div className="min-w-0 flex-1 space-y-3">
        <Skeleton className={`h-4 w-28 rounded-full ${shimmer}`} />
        <Skeleton className={`h-4 w-16 rounded-full ${shimmer}`} />
      </div>
    </div>
  )
}

export function CollectionCardsSkeleton({ count = 4 }: SkeletonCountProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <CollectionCardSkeleton key={index} />
      ))}
    </div>
  )
}

export function CompactCollectionCardsSkeleton({ count = 4 }: SkeletonCountProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <CompactCollectionCardSkeleton key={index} />
      ))}
    </>
  )
}

export function MediaCardsSkeleton({ count = 10 }: SkeletonCountProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[18px] border border-[#F0DDD8] bg-white/80 shadow-[0_16px_44px_rgba(183,110,121,0.06)]"
        >
          <Skeleton className={`aspect-[1.42] w-full rounded-none ${shimmer}`} />
          <div className="space-y-3 p-4">
            <Skeleton className={`h-4 w-3/4 rounded-full ${shimmer}`} />
            <Skeleton className={`h-4 w-1/2 rounded-full ${shimmer}`} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function MediaLibraryScreenSkeleton() {
  return (
    <div className="mt-8 space-y-9">
      <div className="grid gap-3 xl:grid-cols-[minmax(320px,1fr)_160px_180px_170px_auto]">
        <Skeleton className={`h-14 rounded-[18px] ${shimmer}`} />
        <Skeleton className={`h-14 rounded-[18px] ${shimmer}`} />
        <Skeleton className={`h-14 rounded-[18px] ${shimmer}`} />
        <Skeleton className={`h-14 rounded-[18px] ${shimmer}`} />
        <Skeleton className={`h-14 rounded-[18px] ${shimmer}`} />
      </div>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <Skeleton className={`h-6 w-36 rounded-full ${shimmer}`} />
          <Skeleton className={`h-5 w-32 rounded-full ${shimmer}`} />
        </div>
        <CollectionCardsSkeleton />
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <Skeleton className={`h-6 w-32 rounded-full ${shimmer}`} />
          <Skeleton className={`h-5 w-20 rounded-full ${shimmer}`} />
        </div>
        <MediaCardsSkeleton />
      </section>
    </div>
  )
}

export function CollectionDetailScreenSkeleton() {
  return (
    <section className="mx-auto min-h-[calc(100dvh-72px)] w-full max-w-[1540px]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <Skeleton className={`h-5 w-48 rounded-full ${shimmer}`} />
          <div className="mt-4 flex items-center gap-4">
            <Skeleton className={`h-12 w-12 rounded-[14px] ${shimmer}`} />
            <Skeleton className={`h-10 w-52 rounded-full ${shimmer}`} />
          </div>
          <Skeleton className={`mt-3 h-4 w-64 rounded-full ${shimmer}`} />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className={`h-11 w-36 rounded-full ${shimmer}`} />
          <Skeleton className={`h-11 w-40 rounded-full ${shimmer}`} />
          <Skeleton className={`h-11 w-11 rounded-full ${shimmer}`} />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 xl:flex-row xl:items-center">
        <Skeleton className={`h-14 min-w-0 flex-1 rounded-[18px] ${shimmer}`} />
        <Skeleton className={`h-14 rounded-[18px] xl:w-[150px] ${shimmer}`} />
        <Skeleton className={`h-14 rounded-[18px] xl:w-[150px] ${shimmer}`} />
        <Skeleton className={`h-14 rounded-[18px] xl:w-[165px] ${shimmer}`} />
        <Skeleton className={`h-14 rounded-[18px] xl:w-[98px] ${shimmer}`} />
      </div>

      <section className="mt-8">
        <div className="mb-5 flex items-center justify-between">
          <Skeleton className={`h-6 w-44 rounded-full ${shimmer}`} />
          <Skeleton className={`h-5 w-32 rounded-full ${shimmer}`} />
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          <CompactCollectionCardsSkeleton />
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <Skeleton className={`h-6 w-40 rounded-full ${shimmer}`} />
          <Skeleton className={`h-5 w-20 rounded-full ${shimmer}`} />
        </div>
        <MediaCardsSkeleton count={6} />
      </section>
    </section>
  )
}
