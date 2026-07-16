import {
  Heart,
  Users,
  ClipboardList,
  Store,
  CheckSquare,
  Wallet,
  CalendarDays,
  FileSpreadsheet,
} from 'lucide-react'

/**
 * Landing page feature cards.
 */
export const FEATURES = [
  {
    icon: Heart,
    title: 'Wedding Management',
    description:
      'Orchestrate every event \u2014 from haldi and mehendi to the reception \u2014 with one unified master plan.',
    tag: 'Core',
  },
  {
    icon: Users,
    title: 'Team Management',
    description:
      'Assign planners, coordinators & assistants. Track tasks, shifts, and performance in real time.',
    tag: 'Ops',
  },
  {
    icon: ClipboardList,
    title: 'Guest Management',
    description:
      'RSVPs, meal preferences, seating, and accommodations \u2014 all beautifully organized.',
    tag: 'Guests',
  },
  {
    icon: FileSpreadsheet,
    title: 'Guest CSV Upload',
    description:
      'Import thousands of guests from a spreadsheet in seconds. Auto-detect names, phones and dietary tags.',
    tag: 'Import',
  },
  {
    icon: Store,
    title: 'Vendor Management',
    description:
      'Curated vendor directory, contracts, bookings & performance ratings in one place.',
    tag: 'Vendors',
  },
  {
    icon: Wallet,
    title: 'Payment Tracking',
    description:
      'Invoices, milestones, vendor payouts and client dues \u2014 with automatic reminders.',
    tag: 'Finance',
  },
  {
    icon: CalendarDays,
    title: 'Timeline',
    description:
      'A visual master timeline for every ritual, cue and vendor call across the wedding weekend.',
    tag: 'Schedule',
  },
  {
    icon: CheckSquare,
    title: 'Task Tracking',
    description:
      'Kanban boards, deadlines and dependencies keep every wedding running like clockwork.',
    tag: 'Productivity',
  },
]

export const CSV_HIGHLIGHTS = [
  'Smart column detection',
  'WhatsApp invitations in one click',
  'Duplicate & error auto-cleanup',
  'Meal & seating preferences imported',
]

export const RECENT_IMPORTS = [
  { name: 'aditi_karthik_guests.csv', count: '312 rows' },
  { name: 'reception_extended.xlsx', count: '184 rows' },
  { name: 'sangeet_family.csv', count: '96 rows' },
]
