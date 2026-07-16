'use client'

import { motion } from 'framer-motion'
import {
  CalendarClock,
  Camera,
  Flower,
  IndianRupee,
  Music,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ACTIVE_WEDDING } from '@/constants'
import type { NotificationCardData } from '@/types'

const NOTIFICATIONS: NotificationCardData[] = [
  {
    id: 'ceremony',
    label: 'Ceremony',
    title: 'Begins in 2 hours',
    detail: 'Haldi · 4:00 PM',
    Icon: CalendarClock,
    iconWrap: 'bg-[#EAC7CE]',
    iconClass: 'text-[#B76E79]',
    position: 'absolute -left-4 md:-left-10 top-2 w-[190px]',
    entryDelay: 0.5,
    floatDelay: 1.1,
    floatDuration: 5,
    floatY: [0, -8, 0],
  },
  {
    id: 'decor',
    label: 'Vendor Update',
    title: 'Decor team checked in',
    detail: '2 mins ago',
    detailClass: 'text-emerald-600',
    Icon: Flower,
    iconWrap: 'bg-[#F6DDE1]',
    iconClass: 'text-[#B76E79]',
    position: 'absolute -right-2 md:-right-8 top-24 w-[180px]',
    entryDelay: 0.6,
    floatDelay: 1.2,
    floatDuration: 6,
    floatY: [0, 8, 0],
  },
  {
    id: 'photographer',
    label: 'Vendor',
    title: 'Photographer arrived',
    detail: 'On location',
    Icon: Camera,
    iconWrap: 'bg-[#FBE9CF]',
    iconClass: 'text-[#B08750]',
    position: 'absolute -left-6 md:-left-14 top-[45%] w-[180px]',
    entryDelay: 0.7,
    floatDelay: 1.4,
    floatDuration: 5.5,
    floatY: [0, -6, 0],
  },
  {
    id: 'dj',
    label: 'Task Complete',
    title: 'DJ setup completed',
    detail: 'Sangeet stage ready',
    Icon: Music,
    iconWrap: 'bg-[#E6EEDD]',
    iconClass: 'text-[#6E8B6A]',
    position: 'absolute -right-4 md:-right-12 top-[62%] w-[180px]',
    entryDelay: 0.8,
    floatDelay: 1.5,
    floatDuration: 6.5,
    floatY: [0, 7, 0],
  },
]

function NotificationCard({
  label,
  title,
  detail,
  detailClass = 'text-foreground/60',
  Icon,
  iconWrap,
  iconClass,
  position,
  entryDelay,
  floatDelay,
  floatDuration,
  floatY,
}: Omit<NotificationCardData, 'id'>) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1, y: floatY }}
      transition={{
        opacity: { delay: entryDelay, duration: 0.6 },
        scale: { delay: entryDelay, duration: 0.6 },
        y: {
          duration: floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: floatDelay,
        },
      }}
      className={`${position} glass rounded-2xl px-3.5 py-2.5 shadow-xl z-20`}
    >
      <div className="flex items-center gap-2.5">
        <div
          className={`w-9 h-9 rounded-xl ${iconWrap} flex items-center justify-center flex-shrink-0`}
        >
          <Icon className={`w-4 h-4 ${iconClass}`} />
        </div>
        <div className="min-w-0">
          <div className="text-[9px] uppercase tracking-widest text-foreground/50">{label}</div>
          <div className="text-xs font-semibold">{title}</div>
          <div className={`text-[10px] ${detailClass}`}>{detail}</div>
        </div>
      </div>
    </motion.div>
  )
}

function PaymentReminderCard() {
  const { payment } = ACTIVE_WEDDING
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
      transition={{
        opacity: { delay: 0.9, duration: 0.6 },
        scale: { delay: 0.9, duration: 0.6 },
        y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.6 },
      }}
      className="absolute left-1/2 -translate-x-1/2 bottom-0 glass rounded-2xl px-4 py-3 shadow-xl w-[260px] z-20"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#FBE9CF] flex items-center justify-center">
            <IndianRupee className="w-4 h-4 text-[#B08750]" />
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-widest text-foreground/50">
              Payment Reminder
            </div>
            <div className="font-display text-lg text-[#B76E79] leading-none mt-0.5">
              {payment.amount}
            </div>
            <div className="text-[10px] text-foreground/60">
              Due in {payment.dueInDays} days
            </div>
          </div>
        </div>
        <Button
          size="sm"
          className="h-7 px-3 rounded-full bg-[#B76E79] hover:bg-[#a55e69] text-white text-[10px]"
        >
          Remind
        </Button>
      </div>
    </motion.div>
  )
}

export default function WorkspaceNotifications() {
  return (
    <>
      {NOTIFICATIONS.map((notification) => {
        const { id, ...rest } = notification
        return <NotificationCard key={id} {...rest} />
      })}
      <PaymentReminderCard />
    </>
  )
}
