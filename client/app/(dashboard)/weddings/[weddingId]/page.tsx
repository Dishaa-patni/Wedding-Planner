import type { Metadata } from 'next'
import { WeddingWorkspaceDetailScreen } from '@/features/wedding-workspace'

export const metadata: Metadata = { title: 'Wedding — Vivaha' }

type WeddingDetailsPageProps = {
  params: Promise<{
    weddingId: string
  }>
}

export default async function WeddingDetailsPage({ params }: WeddingDetailsPageProps) {
  const { weddingId } = await params

  return <WeddingWorkspaceDetailScreen weddingId={weddingId} />
}
