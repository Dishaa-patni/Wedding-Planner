import type { Metadata } from 'next'
import { Suspense } from 'react'
import { MediaLibraryScreen } from '@/features/media-library'

export const metadata: Metadata = {
  title: 'Media Library - Vivaha',
  description:
    'Organize wedding inspiration, images, videos, and collections.',
}

export default function MediaLibraryPage() {
  return (
    <Suspense fallback={null}>
      <MediaLibraryScreen />
    </Suspense>
  )
}
