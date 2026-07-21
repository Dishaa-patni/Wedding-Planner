'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Check, ClipboardList, Wallet } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  ACTIVE_WEDDING,
  BUDGET_CHART_HEIGHTS,
  DASHBOARD_TEAM,
  DASHBOARD_TIMELINE,
} from '@/constants'

function WindowChrome() {
  return (
    <div className="flex items-center gap-2 mb-4 px-2">
      <div className="flex gap-1.5">
        <span className="w-3 h-3 rounded-full bg-[#B76E79]/70" />
        <span className="w-3 h-3 rounded-full bg-[#D8B26E]/70" />
        <span className="w-3 h-3 rounded-full bg-[#EAC7CE]" />
      </div>
      <div className="ml-3 text-xs text-foreground/50">vivaha.app / dashboard</div>
    </div>
  )
}

function UpcomingWedding() {
  return (
    <div className="bg-white/80 rounded-2xl p-5 border border-white">
      <div className="text-xs uppercase tracking-widest text-foreground/50">Upcoming Wedding</div>
      <div className="font-display text-2xl mt-1">Aditi & Karthik</div>
      <div className="text-sm text-foreground/60 mt-1">28 Dec · Udaipur · 320 guests</div>
      <div className="mt-4 h-2 bg-[#B76E79]/10 rounded-full overflow-hidden">
        <div className="h-full w-[72%] gradient-rose rounded-full" />
      </div>
      <div className="flex justify-between mt-2 text-xs text-foreground/60">
        <span>72% planned</span>
        <span>28 days to go</span>
      </div>
    </div>
  )
}

function PaymentsCard() {
  return (
    <div className="bg-white/80 rounded-2xl p-5 border border-white">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-widest text-foreground/50">Payments</div>
        <Wallet className="h-4 w-4 text-[#B76E79]" />
      </div>
      <div className="font-display text-3xl mt-1 text-[#B76E79]">₹18.4L</div>
      <div className="text-xs text-foreground/60">
        Tracked this month · <span className="text-emerald-600">+24%</span>
      </div>
      <div className="mt-4 grid grid-cols-12 gap-1 h-16 items-end">
        {BUDGET_CHART_HEIGHTS.map((h, i) => (
          <div
            key={i}
            className="rounded-t bg-gradient-to-t from-[#D8B26E]/50 to-[#B76E79]/80"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  )
}

function TimelineCard() {
  return (
    <div className="lg:col-span-5 bg-white/80 rounded-2xl p-5 border border-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-foreground/50">Wedding Timeline</div>
          <div className="font-display text-xl">Aditi & Karthik · Day 2</div>
        </div>
        <Badge className="bg-[#B76E79]/10 text-[#B76E79] hover:bg-[#B76E79]/15 border-0">On Track</Badge>
      </div>
      <div className="space-y-3">
        {DASHBOARD_TIMELINE.map((item) => (
          <div key={item.time} className="flex items-center gap-3">
            <div className="text-xs w-12 text-foreground/60">{item.time}</div>
            <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
            <div className="flex-1 text-sm">{item.event}</div>
            {item.done ? (
              <Check className="h-4 w-4 text-emerald-600" />
            ) : (
              <div className="h-4 w-4 rounded-full border border-foreground/20" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function TeamCard() {
  return (
    <div className="bg-white/80 rounded-2xl p-5 border border-white">
      <div className="text-xs uppercase tracking-widest text-foreground/50">Team on duty</div>
      <div className="mt-3 space-y-3">
        {DASHBOARD_TEAM.map((member) => (
          <div key={member.name} className="flex items-center gap-3">
            <img
              alt=""
              src={`https://ui-avatars.com/api/?name=${member.name}&background=${member.color}&color=fff&size=64`}
              className="w-9 h-9 rounded-full"
            />
            <div>
              <div className="text-sm font-medium">{member.name}</div>
              <div className="text-xs text-foreground/60">{member.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RsvpCard() {
  const { guests } = ACTIVE_WEDDING
  return (
    <div className="bg-white/80 rounded-2xl p-5 border border-white">
      <div className="text-xs uppercase tracking-widest text-foreground/50">Guest RSVPs</div>
      <div className="font-display text-3xl mt-1">
        312<span className="text-base text-foreground/50">/320</span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-foreground/10 overflow-hidden">
        <div className="h-full w-[97%] gradient-rose" />
      </div>
      <div className="mt-2 text-xs text-foreground/60">
        {guests.rsvpPct}% confirmed · 5 pending
      </div>
    </div>
  )
}

export default function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="dashboard" className="relative py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(700px 400px at 50% 20%, rgba(183,110,121,0.08), transparent 70%)',
        }}
      />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-foreground/70 mb-5">
            <ClipboardList className="h-3 w-3 text-[#B76E79]" /> Live Dashboard
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            One dashboard.
            <br /> <span className="gradient-text">Every wedding, at a glance.</span>
          </h2>
          <p className="mt-5 text-foreground/70 text-lg">
            A calm, focused command center that surfaces exactly what needs your attention today.
          </p>
        </motion.div>

        <motion.div ref={ref} style={{ y }} className="relative">
          <div className="glass-strong rounded-3xl p-4 md:p-6 shadow-2xl">
            <WindowChrome />
            <div className="grid lg:grid-cols-12 gap-4 md:gap-5">
              <div className="lg:col-span-4 space-y-4">
                <UpcomingWedding />
                <PaymentsCard />
              </div>
              <TimelineCard />
              <div className="lg:col-span-3 space-y-4">
                <TeamCard />
                <RsvpCard />
              </div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="hidden md:block absolute -top-6 -right-4 glass rounded-2xl px-4 py-2.5 shadow-lg"
          >
            <div className="text-xs text-foreground/60">Auto-synced with</div>
            <div className="text-sm font-medium">Google Calendar & WhatsApp</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
