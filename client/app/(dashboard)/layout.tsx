import type { ReactNode } from 'react'
import { DashboardShell } from '@/components/layout'

export default function DashboardGroupLayout({ children }: { children: ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>
}
