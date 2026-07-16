import type { LucideIcon } from './common'

export type VendorStatus = 'done' | 'pending' | 'in-progress'

export interface Vendor {
  name: string
  icon: LucideIcon
  status: VendorStatus
}
