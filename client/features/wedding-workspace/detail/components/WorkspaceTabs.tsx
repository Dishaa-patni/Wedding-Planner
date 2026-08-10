'use client'

import { workspaceTabs } from '../workspace-detail.data'
import type { WorkspaceTabId } from '../workspace-detail.types'

type WorkspaceTabsProps = {
  activeTab: WorkspaceTabId
  onTabChange: (tab: WorkspaceTabId) => void
}

export function WorkspaceTabs({ activeTab, onTabChange }: WorkspaceTabsProps) {
  return (
    <>
      <nav className="hidden rounded-[22px] border border-[#F0DDD8] bg-white/86 p-2 shadow-[0_16px_44px_rgba(183,110,121,0.07)] md:block">
        <div className="grid grid-cols-6 gap-1">
          {workspaceTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = tab.id === activeTab

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`flex h-11 min-w-0 items-center justify-center gap-2 rounded-[16px] px-2 text-xs font-bold transition lg:text-sm ${
                  isActive
                    ? 'bg-[#FFF0EE] text-[#3B2928] shadow-sm'
                    : 'text-[#756967] hover:bg-[#FFF7F4] hover:text-[#3B2928]'
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-[#D77474]' : 'text-[#8A7B78]'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      <nav className="fixed inset-x-3 bottom-3 z-50 rounded-[22px] border border-[#F0DDD8] bg-white/94 p-2 shadow-[0_18px_50px_rgba(59,41,40,0.16)] backdrop-blur md:hidden">
        <div className="grid grid-cols-6 gap-1">
          {workspaceTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = tab.id === activeTab

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                aria-label={tab.label}
                className={`flex h-11 items-center justify-center rounded-[16px] transition ${
                  isActive ? 'bg-[#FFF0EE] text-[#D77474]' : 'text-[#8A7B78]'
                }`}
              >
                <Icon className="h-5 w-5" />
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}

