import type { Metadata } from 'next'
import { WeddingWorkspaceScreen } from '@/features/wedding-workspace'

export const metadata: Metadata = { title: 'Wedding Workspace - Vivaha' }

export default function WeddingsPage() {
  return <WeddingWorkspaceScreen />
}
