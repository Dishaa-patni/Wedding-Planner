import { Camera, Palette, Utensils, Sparkles } from 'lucide-react'

/**
 * Mock active wedding used across the hero workspace + dashboard preview.
 * In the future this will be replaced by an API-backed model.
 */
export const ACTIVE_WEDDING = {
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

export const VENDORS = [
  { name: 'Photographer', icon: Camera, status: 'done' },
  { name: 'Decorator', icon: Palette, status: 'done' },
  { name: 'Catering', icon: Utensils, status: 'done' },
  { name: 'Makeup', icon: Sparkles, status: 'pending' },
]

export const TIMELINE_ITEMS = [
  { name: 'Haldi', status: 'done', icon: '\ud83c\udf3c' },
  { name: 'Mehendi', status: 'today', icon: '\ud83c\udf3f' },
  { name: 'Sangeet', status: 'tomorrow', icon: '\ud83c\udfb5' },
  { name: 'Reception', status: 'upcoming', icon: '\ud83d\udcab' },
]

/** Progress fill percentage for the timeline connector line. */
export const TIMELINE_FILL_PCT = 38

export const DASHBOARD_TIMELINE = [
  { time: '07:00', event: 'Haldi ceremony \u00b7 Poolside', color: 'bg-[#F5D571]', done: true },
  { time: '11:30', event: 'Mehendi artists arrive', color: 'bg-[#B76E79]', done: true },
  { time: '16:00', event: 'Sangeet rehearsal', color: 'bg-[#D8B26E]', done: false },
  { time: '19:30', event: 'Cocktail dinner setup', color: 'bg-[#EAC7CE]', done: false },
]

export const DASHBOARD_TEAM = [
  { name: 'Priya', role: 'Lead Planner', color: 'B76E79' },
  { name: 'Aarav', role: 'Vendor Lead', color: 'D8B26E' },
  { name: 'Neha', role: 'Guest Desk', color: 'EAC7CE' },
]

export const BUDGET_CHART_HEIGHTS = [40, 65, 55, 80, 45, 90, 60, 72, 88, 50, 70, 95]

export const WORKSPACE_MINI_BUDGET_HEIGHTS = [
  35, 55, 42, 68, 50, 72, 60, 80, 65, 58, 74, 66,
]
