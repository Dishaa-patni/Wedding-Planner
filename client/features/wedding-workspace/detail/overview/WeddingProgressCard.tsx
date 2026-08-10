import { CheckCircle2, Circle } from 'lucide-react'
import { planningSteps } from '../workspace-detail.data'

export function WeddingProgressCard() {
  return (
    <div className="rounded-[22px] border border-[#F0DDD8] bg-white/86 p-5 shadow-[0_14px_38px_rgba(183,110,121,0.06)]">
      <div>
        <h2 className="text-lg font-bold text-[#3B2928]">Wedding Progress</h2>
        <p className="mt-1 text-sm text-[#756967]">Overall planning completion</p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[132px_1fr] lg:items-center">
        <div className="relative mx-auto flex h-[132px] w-[132px] items-center justify-center rounded-full bg-[conic-gradient(#D77474_0deg,#D77474_173deg,#F8DFDC_173deg,#F8DFDC_360deg)]">
          <div className="flex h-[96px] w-[96px] flex-col items-center justify-center rounded-full bg-white">
            <span className="font-display text-2xl leading-none text-[#3B2928]">48%</span>
            <span className="mt-1 text-xs font-semibold text-[#756967]">Complete</span>
          </div>
        </div>

        <div className="min-w-0 space-y-3">
          {planningSteps.map((step) => (
            <div key={step.label}>
              <div className="flex min-w-0 items-center justify-between gap-3 text-sm font-semibold">
                <span className="flex min-w-0 items-center gap-2 text-[#3B2928]">
                  {step.value >= 80 ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#5DAE78]" />
                  ) : (
                    <Circle className="h-4 w-4 shrink-0 text-[#C9BCB8]" />
                  )}
                  <span className="truncate">{step.label}</span>
                </span>
                <span className="shrink-0 text-[#756967]">{step.value}%</span>
              </div>
              <div className="mt-2 h-1.5 max-w-[180px] rounded-full bg-[#F4E6E2]">
                <div
                  className={`h-full rounded-full ${
                    step.tone === 'green'
                      ? 'bg-[#A7D8A0]'
                      : step.tone === 'gold'
                        ? 'bg-[#E7C982]'
                        : 'bg-[#F0B5B4]'
                  }`}
                  style={{ width: `${step.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button type="button" className="mt-6 text-sm font-bold text-[#D77474]">
        View full progress
      </button>
    </div>
  )
}
