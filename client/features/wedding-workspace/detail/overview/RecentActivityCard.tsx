import { Gem, Package, WalletCards, ClipboardList } from 'lucide-react'
import { activities, toneClasses } from '../workspace-detail.data'

const icons = [Gem, WalletCards, Package, ClipboardList]

export function RecentActivityCard() {
  return (
    <div className="rounded-[22px] border border-[#F0DDD8] bg-white/86 p-5 shadow-[0_14px_38px_rgba(183,110,121,0.06)]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-[#3B2928]">Recent Activity</h2>
        <button type="button" className="shrink-0 text-sm font-bold text-[#D77474]">
          View all
        </button>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {activities.map((activity, index) => {
          const Icon = icons[index] ?? Gem

          return (
            <div
              key={activity.title}
              className="flex min-w-0 items-center gap-3 rounded-[18px] border border-[#F4E6E2] bg-white/58 p-3"
            >
              <span className={`${toneClasses[activity.tone]} flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px]`}>
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold leading-5 text-[#3B2928]">{activity.title}</p>
                <p className="mt-1 text-xs font-semibold leading-5 text-[#756967]">{activity.meta}</p>
              </div>
              {activity.thumbnail && (
                <div
                  className="h-12 w-14 shrink-0 rounded-[14px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${activity.thumbnail})` }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
