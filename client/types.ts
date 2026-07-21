import type { ComponentType, ReactNode, SVGProps } from 'react'

export type LucideIcon = ComponentType<SVGProps<SVGSVGElement>>

export type PropsWithChildren<P = Record<string, unknown>> = P & {
  children?: ReactNode
}

export interface Avatar {
  name: string
  bg: string
}

export interface NavLink {
  href: string
  label: string
}

export interface FooterSection {
  heading: string
  links: string[]
}

export interface SocialProof {
  studioCount: number
  rating: number
  ratingLabel: string
}

export interface HeroCopy {
  badge: string
  headline: {
    line1: string
    accent: string
    line2: string
    italic: string
  }
  subheading: string
  primaryCta: string
  secondaryCta: string
}

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  city: string
  legalName: string
  supportEmail: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
  tag: string
}

export interface RecentImport {
  name: string
  count: string
}

export interface PricingPlan {
  name: string
  price: string
  period: string
  tagline: string
  features: string[]
  highlight: boolean
  ctaLabel: string
}

export interface Testimonial {
  name: string
  role: string
  quote: string
  rating: number
  avatar: string
}

export type TimelineStatus = 'done' | 'today' | 'tomorrow' | 'upcoming'

export interface TimelineItem {
  name: string
  status: TimelineStatus
  icon: string
}

export interface DashboardTimelineEntry {
  time: string
  event: string
  color: string
  done: boolean
}

export interface DashboardTeamMember {
  name: string
  role: string
  color: string
}

export type TeamMemberRole = 'planner' | 'coordinator' | 'assistant' | 'owner'

export interface User {
  id: string
  name: string
  email: string
  role: TeamMemberRole
  avatar?: string
}

export type VendorStatus = 'done' | 'pending' | 'in-progress'

export interface Vendor {
  name: string
  icon: LucideIcon
  status: VendorStatus
}

export interface NotificationCardData {
  id: string
  label: string
  title: string
  detail: string
  detailClass?: string
  Icon: LucideIcon
  iconWrap: string
  iconClass: string
  position: string
  entryDelay: number
  floatDelay: number
  floatDuration: number
  floatY: number[]
}

export interface Guests {
  confirmed: number
  pending: number
  total: number
  rsvpPct: number
}

export interface Budget {
  totalLakhs: number
  utilizedPct: number
}

export interface Team {
  count: number
  members: string[]
  extra: number
}

export interface Payment {
  amount: string
  dueInDays: number
}

export interface Couple {
  first: string
  second: string
}

export interface Wedding {
  id?: string
  couple: Couple
  date: string
  venue: string
  progress: number
  guests: Guests
  budget: Budget
  team: Team
  payment: Payment
}
