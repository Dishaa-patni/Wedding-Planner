import type { ComponentType, SVGProps } from 'react'

export type WorkspaceTabId =
  | 'overview'
  | 'tasks'
  | 'moodboard'
  | 'guests'
  | 'vendors'
  | 'payments'

export type WorkspaceTab = {
  id: WorkspaceTabId
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

