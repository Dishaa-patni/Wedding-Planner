import type { Metadata } from 'next'
import { CollectionDetailScreen } from '@/features/media-library'

type CollectionPageProps = {
  params: Promise<{
    collectionId: string
  }>
}

export const metadata: Metadata = {
  title: 'Collection - Vivaha',
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { collectionId } = await params

  return <CollectionDetailScreen collectionId={collectionId} />
}
