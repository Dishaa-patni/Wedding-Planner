'use client'

import WorkspaceCard from './WorkspaceCard'
import WorkspaceNotifications from './WorkspaceNotifications'

/**
 * Interactive Wedding Workspace card that acts as the hero visual.
 * Composes the main dashboard card + floating notification widgets.
 */
export default function WeddingWorkspace() {
  return (
    <div className="relative mx-auto w-full max-w-[440px] h-[620px] md:h-[640px]">
      <div className="absolute -inset-10 -z-10">
        <div className="absolute top-6 -left-6 w-52 h-52 rounded-full bg-[#EAC7CE]/55 blur-3xl" />
        <div className="absolute -bottom-6 -right-6 w-64 h-64 rounded-full bg-[#D8B26E]/40 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#F6DDE1]/40 blur-3xl" />
      </div>
      <WorkspaceCard />
      <WorkspaceNotifications />
    </div>
  )
}
