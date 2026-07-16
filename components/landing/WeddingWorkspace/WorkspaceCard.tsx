'use client'

import { motion } from 'framer-motion'
import {
  CalendarDays,
  Check,
  Heart,
  Store,
  UserCheck,
  Users,
  Wallet,
} from 'lucide-react'
import { AnimatedBar, CircularProgress } from '@/components/shared'
import { useCountUp } from '@/hooks'
import {
  ACTIVE_WEDDING,
  TIMELINE_ITEMS,
  TIMELINE_FILL_PCT,
  VENDORS,
  WORKSPACE_MINI_BUDGET_HEIGHTS,
} from '@/constants'

function WindowChrome() {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#B76E79]/60" />
        <span className="w-2 h-2 rounded-full bg-[#D8B26E]/60" />
        <span className="w-2 h-2 rounded-full bg-[#EAC7CE]" />
      </div>
      <div className="text-[9px] tracking-[0.25em] uppercase text-foreground/40">
        Vivaha · Workspace
      </div>
      <div className="flex items-center gap-1 text-[9px] text-emerald-600">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
      </div>
    </div>
  )
}

function WorkspaceHeader() {
  const { couple, date, venue, progress } = ACTIVE_WEDDING
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#B76E79]/80">
          <Heart className="w-3 h-3 fill-[#B76E79] text-[#B76E79]" /> Active Wedding
        </div>
        <div className="font-display text-2xl md:text-[1.7rem] leading-tight text-foreground mt-1">
          {couple.first} <span className="text-[#B76E79]">&</span> {couple.second}
        </div>
        <div className="text-[11px] text-foreground/60 mt-0.5 flex items-center gap-1.5">
          <CalendarDays className="w-3 h-3" /> {date}
        </div>
        <div className="text-[11px] text-foreground/60 flex items-center gap-1.5">
          <span className="w-3 h-3 inline-flex items-center justify-center">📍</span> {venue}
        </div>
      </div>
      <CircularProgress value={progress} size={78} stroke={7} />
    </div>
  )
}

function GuestsStat() {
  const guests = useCountUp(ACTIVE_WEDDING.guests.confirmed, 1400)
  const pending = useCountUp(ACTIVE_WEDDING.guests.pending, 1200)
  return (
    <div className="bg-white/75 rounded-xl p-3 border border-white/70">
      <div className="flex items-center justify-between">
        <div className="text-[9px] uppercase tracking-widest text-foreground/50">Guests</div>
        <Users className="w-3.5 h-3.5 text-[#B76E79]" />
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="font-display text-xl text-foreground leading-none">{guests}</span>
        <span className="text-[10px] text-emerald-600">Confirmed</span>
      </div>
      <div className="text-[10px] text-foreground/60 mt-0.5">{pending} Pending</div>
      <div className="mt-2">
        <AnimatedBar pct={ACTIVE_WEDDING.guests.rsvpPct} delay={200} />
      </div>
    </div>
  )
}

function BudgetStat() {
  const budgetLakhs = useCountUp(Math.round(ACTIVE_WEDDING.budget.totalLakhs * 10), 1600)
  const budgetUtil = useCountUp(ACTIVE_WEDDING.budget.utilizedPct, 1300)
  return (
    <div className="bg-white/75 rounded-xl p-3 border border-white/70">
      <div className="flex items-center justify-between">
        <div className="text-[9px] uppercase tracking-widest text-foreground/50">Budget</div>
        <Wallet className="w-3.5 h-3.5 text-[#B76E79]" />
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="font-display text-xl text-foreground leading-none">
          ₹{(budgetLakhs / 10).toFixed(1)}L
        </span>
      </div>
      <div className="text-[10px] text-foreground/60 mt-0.5">{budgetUtil}% utilized</div>
      <div className="mt-2 flex items-end gap-0.5 h-5">
        {WORKSPACE_MINI_BUDGET_HEIGHTS.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: 0.6 + i * 0.04, duration: 0.6 }}
            className="flex-1 rounded-t bg-gradient-to-t from-[#D8B26E]/60 to-[#B76E79]/80"
          />
        ))}
      </div>
    </div>
  )
}

function TeamStat() {
  const count = useCountUp(ACTIVE_WEDDING.team.count, 1100)
  return (
    <div className="bg-white/75 rounded-xl p-3 border border-white/70">
      <div className="flex items-center justify-between">
        <div className="text-[9px] uppercase tracking-widest text-foreground/50">Team</div>
        <UserCheck className="w-3.5 h-3.5 text-[#B76E79]" />
      </div>
      <div className="mt-1 font-display text-xl text-foreground leading-none">
        {count} <span className="text-[10px] font-sans text-foreground/60">members</span>
      </div>
      <div className="mt-2 flex -space-x-1.5">
        {ACTIVE_WEDDING.team.members.map((name, k) => (
          <img
            key={name}
            alt=""
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${k % 2 ? 'D8B26E' : 'B76E79'}&color=fff&size=48`}
            className="w-5 h-5 rounded-full border border-white"
          />
        ))}
        <div className="w-5 h-5 rounded-full bg-[#F1D9DE] border border-white flex items-center justify-center text-[8px] text-[#B76E79] font-medium">
          +{ACTIVE_WEDDING.team.extra}
        </div>
      </div>
    </div>
  )
}

function VendorsStat() {
  return (
    <div className="bg-white/75 rounded-xl p-3 border border-white/70">
      <div className="flex items-center justify-between">
        <div className="text-[9px] uppercase tracking-widest text-foreground/50">Vendors</div>
        <Store className="w-3.5 h-3.5 text-[#B76E79]" />
      </div>
      <ul className="mt-1.5 space-y-1">
        {VENDORS.map((vendor, i) => {
          const Icon = vendor.icon
          return (
            <motion.li
              key={vendor.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.4 }}
              className="flex items-center gap-1.5 text-[10px]"
            >
              <Icon className="w-3 h-3 text-foreground/60" />
              <span className="flex-1 truncate">{vendor.name}</span>
              {vendor.status === 'done' ? (
                <Check className="w-3 h-3 text-emerald-600" />
              ) : (
                <span className="text-[9px] text-[#B08750] bg-[#FBE9CF] px-1.5 py-[1px] rounded-full">
                  Pending
                </span>
              )}
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}

function TimelineStrip() {
  return (
    <div className="mt-3 bg-white/75 rounded-xl p-3 border border-white/70">
      <div className="flex items-center justify-between">
        <div className="text-[9px] uppercase tracking-widest text-foreground/50">Timeline</div>
        <div className="text-[9px] text-foreground/50">{TIMELINE_ITEMS.length} events</div>
      </div>
      <div className="mt-2 relative">
        <div className="absolute left-2 right-2 top-3 h-[2px] bg-[#F1D9DE]" />
        <motion.div
          className="absolute left-2 top-3 h-[2px] gradient-rose rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${TIMELINE_FILL_PCT}%` }}
          transition={{ delay: 0.8, duration: 1.2 }}
        />
        <div className="grid grid-cols-4 gap-1 relative">
          {TIMELINE_ITEMS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.18, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border-2 border-white shadow-sm ${
                  item.status === 'done'
                    ? 'gradient-rose text-white'
                    : item.status === 'today'
                    ? 'bg-[#D8B26E] text-white'
                    : 'bg-white text-foreground/40'
                }`}
              >
                {item.status === 'done' ? <Check className="w-3 h-3" /> : item.icon}
              </div>
              <div className="mt-1.5 text-[9px] font-medium text-foreground/80 text-center leading-tight">
                {item.name}
              </div>
              <div className="text-[8px] text-foreground/50 leading-tight capitalize">
                {item.status === 'done' ? 'Complete' : item.status}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function WorkspaceCard() {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute inset-x-6 top-4 bottom-6"
    >
      <div className="glass-strong rounded-[1.75rem] p-4 md:p-5 h-full border border-[#B76E79]/15 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.5), transparent)',
          }}
        />
        <WindowChrome />
        <WorkspaceHeader />
        <div className="mt-3">
          <div className="flex justify-between text-[10px] text-foreground/60 mb-1">
            <span className="uppercase tracking-widest">Wedding Progress</span>
            <span className="text-[#B76E79] font-medium">{ACTIVE_WEDDING.progress}%</span>
          </div>
          <AnimatedBar pct={ACTIVE_WEDDING.progress} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <GuestsStat />
          <BudgetStat />
          <TeamStat />
          <VendorsStat />
        </div>
        <TimelineStrip />
      </div>
    </motion.div>
  )
}
