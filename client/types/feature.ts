import type { LucideIcon } from './common'

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
  tag: string
}

export interface RecentImport {
  name: string
  count: string
}
