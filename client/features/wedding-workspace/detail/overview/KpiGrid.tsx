import {
  CalendarDays,
  CheckSquare,
  ChevronRight,
  CreditCard,
  Users,
  WalletCards,
} from 'lucide-react'
import { teamAvatars, toneClasses } from '../workspace-detail.data'

type KpiGridProps = {
  daysToWedding: number
  weddingDateLabel: string
}

const kpis = [
  {
    label: 'Tasks Due',
    value: '12',
    description: 'This week',
    icon: CheckSquare,
    tone: 'purple',
    compactValue: false,
  },
  {
    label: 'Payments Pending',
    value: 'INR 1.24L',
    description: '2 payments',
    icon: CreditCard,
    tone: 'gold',
    compactValue: true,
  },
  {
    label: 'Budget Utilized',
    value: '68%',
    description: 'INR 8.16L / 12L',
    icon: WalletCards,
    tone: 'green',
    compactValue: false,
  },
] as const

export function KpiGrid({ daysToWedding, weddingDateLabel }: KpiGridProps) {
  return (
    <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <div className="min-h-[128px] rounded-[22px] border border-[#F0DDD8] bg-white/86 p-5 shadow-[0_14px_38px_rgba(183,110,121,0.06)]">
        <div className="flex items-start gap-4">
          <span className={`${toneClasses.rose} flex h-11 w-11 shrink-0 items-center justify-center rounded-full`}>
            <CalendarDays className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-[#756967]">Days to Wedding</p>
            <p className="mt-3 font-display text-3xl leading-none text-[#3B2928]">{daysToWedding}</p>
            <p className="mt-2 text-sm font-semibold text-[#8A7B78]">{weddingDateLabel}</p>
          </div>
        </div>
      </div>

      {kpis.map((kpi) => {
        const Icon = kpi.icon

        return (
          <div
            key={kpi.label}
            className="min-h-[128px] rounded-[22px] border border-[#F0DDD8] bg-white/86 p-5 shadow-[0_14px_38px_rgba(183,110,121,0.06)]"
          >
            <div className="flex items-start gap-4">
              <span className={`${toneClasses[kpi.tone]} flex h-11 w-11 shrink-0 items-center justify-center rounded-full`}>
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#756967]">{kpi.label}</p>
                <p
                  className={`mt-3 font-display leading-none text-[#3B2928] ${
                    kpi.compactValue ? 'text-2xl' : 'text-3xl'
                  }`}
                >
                  {kpi.value}
                </p>
                <p className="mt-2 text-sm font-semibold text-[#8A7B78]">{kpi.description}</p>
              </div>
            </div>
          </div>
        )
      })}

      <div className="min-h-[128px] rounded-[22px] border border-[#F0DDD8] bg-white/86 p-5 shadow-[0_14px_38px_rgba(183,110,121,0.06)]">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-bold text-[#756967]">Team on Duty</p>
            <p className="mt-3 font-display text-3xl leading-none text-[#3B2928]">5</p>
            <p className="mt-2 text-sm font-semibold text-[#8A7B78]">Members</p>
          </div>
          <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-[#B9AAA6]" />
        </div>
        <div className="mt-4 flex">
          {teamAvatars.map((avatar, index) => (
            <span
              key={avatar}
              className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#FFD4CE] text-[11px] font-bold text-white"
              style={{ marginLeft: index === 0 ? 0 : -9 }}
            >
              {avatar}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
