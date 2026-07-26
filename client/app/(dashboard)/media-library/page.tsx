import type { Metadata } from 'next'
import { MediaLibraryScreen } from '@/features/media-library'

export const metadata: Metadata = { title: 'Media Library — Vivaha' }

export default function MediaLibraryPage() {
  return <MediaLibraryScreen />
}
