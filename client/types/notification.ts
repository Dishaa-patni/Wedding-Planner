import type { LucideIcon } from './common'

export interface NotificationCardData {
  id: string
  label: string
  title: string
  detail: string
  detailClass?: string
  Icon: LucideIcon
  iconWrap: string
  iconClass: string
  position: string
  entryDelay: number
  floatDelay: number
  floatDuration: number
  floatY: number[]
}
