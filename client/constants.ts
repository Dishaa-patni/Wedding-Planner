import {
  CalendarDays,
  Camera,
  CheckSquare,
  ClipboardList,
  FileSpreadsheet,
  Heart,
  Palette,
  Sparkles,
  Store,
  Users,
  Utensils,
  Wallet,
} from 'lucide-react'
import type {
  Avatar,
  DashboardTeamMember,
  DashboardTimelineEntry,
  FaqItem,
  Feature,
  FooterSection,
  HeroCopy,
  NavLink,
  PricingPlan,
  RecentImport,
  SiteConfig,
  SocialProof,
  Testimonial,
  TimelineItem,
  Vendor,
  Wedding,
} from './types'

export const USER_ROLES = {
  ADMIN: 'admin',
  TEAM: 'team',
} as const

export const SITE: SiteConfig = {
  name: 'Vivaha',
  tagline: 'Wedding OS',
  description:
    'The premium SaaS platform for wedding planning companies. Manage every wedding, team, task and payment in one elegant place.',
  city: 'Mumbai',
  legalName: 'Vivaha Technologies Pvt. Ltd.',
  supportEmail: 'hello@vivaha.app',
}

export const ROUTES = {
  home: '/',
  login: '/login',
  signup: '/signup',
  dashboard: '/dashboard',
  features: '/features',
  pricing: '/pricing',
  testimonials: '/testimonials',
  faq: '/faq',
} as const

export const NAV_LINKS: NavLink[] = [
  { href: '#features', label: 'Features' },
  { href: '#dashboard', label: 'Dashboard' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

export const FOOTER_LINKS: FooterSection[] = [
  { heading: 'Product', links: ['Features', 'Dashboard', 'Pricing', 'Integrations', 'Changelog'] },
  { heading: 'Company', links: ['About', 'Careers', 'Press', 'Contact', 'Blog'] },
  { heading: 'Resources', links: ['Help center', 'Templates', 'Guides', 'API', 'Status'] },
]

export const SOCIAL_PROOF: SocialProof = {
  studioCount: 500,
  rating: 4.9,
  ratingLabel: 'Loved by 500+ planning studios',
}

export const HERO: HeroCopy = {
  badge: 'Built for Modern Wedding Planners',
  headline: {
    line1: 'Plan, Manage',
    accent: '& Celebrate',
    line2: 'Weddings',
    italic: 'Effortlessly',
  },
  subheading:
    'From the first client meeting to the final celebration, manage every wedding, team, vendor, task and payment in one beautiful workspace.',
  primaryCta: 'Start Free Trial',
  secondaryCta: 'View Live Demo',
}

export const COLORS = {
  ivory: '#FFF9F6',
  roseGold: '#B76E79',
  roseGoldDark: '#a55e69',
  blush: '#EAC7CE',
  blushLight: '#F6DDE1',
  gold: '#D8B26E',
  goldSoft: '#FBE9CF',
  goldDeep: '#B08750',
  charcoal: '#2E2E2E',
  sage: '#7C9878',
  sageSoft: '#E6EEDD',
  emerald: '#059669',
  cream: '#FBF0DA',
} as const

export const RADII = {
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  pill: '9999px',
} as const

export const BACKGROUND_IMAGE_URL =
  'https://customer-assets-39nsmqrw.emergentagent.net/job_weddings-hub-7/artifacts/wshm155x_ChatGPT%20Image%20Jul%2015%2C%202026%2C%2009_38_19%20PM.png'

export const ANIMATION = {
  fastMs: 300,
  baseMs: 600,
  slowMs: 900,
  progressBarSec: 1.4,
  ringSec: 1.6,
  floatShort: 5,
  floatMedium: 6,
  floatLong: 7,
  staggerSec: 0.06,
  viewportMargin: '-80px',
} as const

export const FADE_IN_UP = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7 },
} as const

export const FADE_IN = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 },
} as const

export const PETAL_PALETTE: readonly string[] = [
  '#EAC7CE',
  '#F6DDE1',
  '#FBE9CF',
  '#D8B26E',
  '#F0D6D6',
  '#FADCDE',
  '#E7B7B0',
  '#F5CBD1',
]

export const FEATURES: Feature[] = [
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

export const CSV_HIGHLIGHTS: readonly string[] = [
  'Smart column detection',
  'WhatsApp invitations in one click',
  'Duplicate & error auto-cleanup',
  'Meal & seating preferences imported',
]

export const RECENT_IMPORTS: RecentImport[] = [
  { name: 'aditi_karthik_guests.csv', count: '312 rows' },
  { name: 'reception_extended.xlsx', count: '184 rows' },
  { name: 'sangeet_family.csv', count: '96 rows' },
]

export const TRUSTED_BRANDS: readonly string[] = [
  'Saat Phere Studio',
  'Marigold Events',
  'The Baraat Co.',
  'Shubh Muhurat',
  'Anaya Weddings',
  'Sindoor & Silk',
  'Regal Rituals',
]

const buildAvatar = (name: string, bg: string): string =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=fff&size=128`

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Ananya Kapoor',
    role: 'Founder, Saat Phere Weddings',
    quote:
      'Vivaha replaced 6 different tools we used for destination weddings. Our team saves 20+ hours every week and clients feel the difference.',
    rating: 5,
    avatar: buildAvatar('Ananya Kapoor', 'B76E79'),
  },
  {
    name: 'Rohan Mehta',
    role: 'CEO, The Baraat Company',
    quote:
      'The payment tracking alone paid for our subscription in the first month. Beautiful, thoughtful software built by people who understand weddings.',
    rating: 5,
    avatar: buildAvatar('Rohan Mehta', 'D8B26E'),
  },
  {
    name: 'Isha Reddy',
    role: 'Head Planner, Marigold Events',
    quote:
      'From vendor coordination to guest RSVPs, everything just flows. It feels less like software and more like a very capable second-in-command.',
    rating: 5,
    avatar: buildAvatar('Isha Reddy', 'B76E79'),
  },
]

export const HERO_AVATARS: Avatar[] = [
  { name: 'Ananya K', bg: 'B76E79' },
  { name: 'Rohan M', bg: 'D8B26E' },
  { name: 'Isha R', bg: 'B76E79' },
  { name: 'Vikram S', bg: 'D8B26E' },
]

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    price: '\u20b92,999',
    period: '/mo',
    tagline: 'For boutique planners',
    features: [
      'Up to 5 active weddings',
      '3 team members',
      'Basic vendor directory',
      'Guest & task management',
      'Email support',
    ],
    highlight: false,
    ctaLabel: 'Start Free Trial',
  },
  {
    name: 'Studio',
    price: '\u20b97,999',
    period: '/mo',
    tagline: 'Most loved by growing studios',
    features: [
      'Up to 25 active weddings',
      '15 team members',
      'Advanced vendor CRM',
      'Payment tracking & invoicing',
      'Client portal',
      'Priority support',
    ],
    highlight: true,
    ctaLabel: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    tagline: 'For destination wedding houses',
    features: [
      'Unlimited weddings & team',
      'Custom integrations',
      'Dedicated success manager',
      'White-label client portal',
      'SLA & onboarding',
    ],
    highlight: false,
    ctaLabel: 'Talk to Sales',
  },
]

export const FAQS: FaqItem[] = [
  {
    question: 'Is Vivaha built specifically for Indian weddings?',
    answer:
      'Yes \u2014 while it works beautifully for any wedding, every workflow (haldi, mehendi, sangeet, pheras, reception) is a first-class citizen. Vendor categories, ritual templates and payment structures are tuned for the Indian market.',
  },
  {
    question: 'Can my whole team collaborate inside a single wedding?',
    answer:
      'Absolutely. Invite planners, coordinators, and assistants with granular roles. Everyone sees the same timeline, tasks and vendor conversations \u2014 updated in real time.',
  },
  {
    question: 'How do you handle client payments and vendor payouts?',
    answer:
      'You can define milestone-based invoicing, take advance payments online, and schedule automatic vendor payouts. Clients get a beautiful branded portal to pay you.',
  },
  {
    question: 'Can I import my guest list from a spreadsheet?',
    answer:
      'Yes. Upload a CSV or Excel file with any column layout \u2014 Vivaha auto-detects names, phone numbers, dietary preferences and RSVP status. Thousands of guests in under a minute.',
  },
  {
    question: "Is my clients' data safe?",
    answer:
      'Yes. All data is encrypted in transit and at rest, hosted on ISO-27001 certified infrastructure. Only you and your invited team members can access your weddings.',
  },
  {
    question: 'Can I try it before I pay?',
    answer:
      '14-day free trial, no credit card required. See a full working dashboard with sample weddings the moment you sign up.',
  },
]

export const ACTIVE_WEDDING: Wedding = {
  couple: { first: 'Aarav', second: 'Ananya' },
  date: '12 Dec 2026',
  venue: 'Umaid Bhawan Palace',
  progress: 72,
  guests: { confirmed: 520, pending: 18, total: 538, rsvpPct: 97 },
  budget: { totalLakhs: 18.4, utilizedPct: 65 },
  team: {
    count: 14,
    members: ['Priya', 'Aarav', 'Neha', 'Rahul', 'Mira', 'Kabir'],
    extra: 8,
  },
  payment: { amount: '\u20b92,40,000', dueInDays: 3 },
}

export const VENDORS: Vendor[] = [
  { name: 'Photographer', icon: Camera, status: 'done' },
  { name: 'Decorator', icon: Palette, status: 'done' },
  { name: 'Catering', icon: Utensils, status: 'done' },
  { name: 'Makeup', icon: Sparkles, status: 'pending' },
]

export const TIMELINE_ITEMS: TimelineItem[] = [
  { name: 'Haldi', status: 'done', icon: '\uD83C\uDF3C' },
  { name: 'Mehendi', status: 'today', icon: '\uD83C\uDF3F' },
  { name: 'Sangeet', status: 'tomorrow', icon: '\uD83C\uDFB5' },
  { name: 'Reception', status: 'upcoming', icon: '\uD83D\uDCAB' },
]

export const TIMELINE_FILL_PCT = 38

export const DASHBOARD_TIMELINE: DashboardTimelineEntry[] = [
  { time: '07:00', event: 'Haldi ceremony \u00b7 Poolside', color: 'bg-[#F5D571]', done: true },
  { time: '11:30', event: 'Mehendi artists arrive', color: 'bg-[#B76E79]', done: true },
  { time: '16:00', event: 'Sangeet rehearsal', color: 'bg-[#D8B26E]', done: false },
  { time: '19:30', event: 'Cocktail dinner setup', color: 'bg-[#EAC7CE]', done: false },
]

export const DASHBOARD_TEAM: DashboardTeamMember[] = [
  { name: 'Priya', role: 'Lead Planner', color: 'B76E79' },
  { name: 'Aarav', role: 'Vendor Lead', color: 'D8B26E' },
  { name: 'Neha', role: 'Guest Desk', color: 'EAC7CE' },
]

export const BUDGET_CHART_HEIGHTS: readonly number[] = [
  40, 65, 55, 80, 45, 90, 60, 72, 88, 50, 70, 95,
]

export const WORKSPACE_MINI_BUDGET_HEIGHTS: readonly number[] = [
  35, 55, 42, 68, 50, 72, 60, 80, 65, 58, 74, 66,
]

export const PASSWORD_RULE =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

  export const PASSWORD_MESSAGE =
  'Password must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
