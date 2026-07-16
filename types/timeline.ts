export type TimelineStatus = 'done' | 'today' | 'tomorrow' | 'upcoming'

export interface TimelineItem {
  name: string
  status: TimelineStatus
  icon: string
}

export interface DashboardTimelineEntry {
  time: string
  event: string
  color: string
  done: boolean
}
