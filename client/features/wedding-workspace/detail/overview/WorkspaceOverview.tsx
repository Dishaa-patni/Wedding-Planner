import { KpiGrid } from './KpiGrid'
import { RecentActivityCard } from './RecentActivityCard'
import { UpcomingMilestonesCard } from './UpcomingMilestonesCard'
import { WeddingProgressCard } from './WeddingProgressCard'

type WorkspaceOverviewProps = {
  daysToWedding: number
  weddingDateLabel: string
}

export function WorkspaceOverview({
  daysToWedding,
  weddingDateLabel,
}: WorkspaceOverviewProps) {
  return (
    <div className="mt-7 space-y-5">
      <KpiGrid daysToWedding={daysToWedding} weddingDateLabel={weddingDateLabel} />

      <div className="grid min-w-0 gap-5 xl:grid-cols-[1fr_1fr]">
        <WeddingProgressCard />
        <UpcomingMilestonesCard />
      </div>

      <div>
        <RecentActivityCard />
      </div>
    </div>
  )
}
