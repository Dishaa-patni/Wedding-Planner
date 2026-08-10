import { milestones } from '../workspace-detail.data'

export function UpcomingMilestonesCard() {
  return (
    <div className="rounded-[22px] border border-[#F0DDD8] bg-white/86 p-5 shadow-[0_14px_38px_rgba(183,110,121,0.06)]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-[#3B2928]">Upcoming Milestones</h2>
        <button type="button" className="shrink-0 text-sm font-bold text-[#D77474]">
          View all
        </button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3 xl:grid-cols-1">
        {milestones.map((milestone) => (
          <div
            key={milestone.title}
            className="grid grid-cols-[54px_1fr] gap-4 rounded-[18px] border border-[#F4E6E2] bg-white/58 p-3 xl:border-x-0 xl:border-t-0 xl:bg-transparent xl:p-0 xl:pb-4 xl:last:border-b-0 xl:last:pb-0"
          >
            <div className="flex h-14 w-14 flex-col items-center justify-center rounded-[16px] bg-[#FFF7F4] text-[#3B2928]">
              <span className="font-display text-xl leading-none">{milestone.day}</span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#756967]">
                {milestone.month}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold leading-5 text-[#3B2928]">{milestone.title}</p>
              <p className="mt-1 text-xs font-semibold leading-5 text-[#756967]">
                {milestone.date} - {milestone.time}
              </p>
              <span className="mt-2 inline-flex rounded-full bg-[#FFF0EE] px-3 py-1 text-xs font-bold text-[#D77474]">
                {milestone.due}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
