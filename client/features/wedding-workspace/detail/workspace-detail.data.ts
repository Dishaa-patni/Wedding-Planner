import {
  CheckSquare,
  CreditCard,
  Gem,
  Home,
  Package,
  Users,
} from 'lucide-react'
import type { WorkspaceTab } from './workspace-detail.types'

export const workspaceTabs: WorkspaceTab[] = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'moodboard', label: 'Moodboard', icon: Gem },
  { id: 'guests', label: 'Guests & RSVP', icon: Users },
  { id: 'vendors', label: 'Vendors', icon: Package },
  { id: 'payments', label: 'Payments', icon: CreditCard },
]

export const teamAvatars = ['AR', 'NS', 'RM', 'VK', 'DP']

export const planningSteps = [
  { label: 'Planning & Setup', value: 100, tone: 'green' },
  { label: 'Vendor Booking', value: 80, tone: 'green' },
  { label: 'Payments', value: 40, tone: 'gold' },
  { label: 'Guest Management', value: 30, tone: 'rose' },
  { label: 'Final Preparations', value: 20, tone: 'rose' },
] as const

export const milestones = [
  {
    day: '15',
    month: 'SEP',
    title: 'Final Venue Walkthrough',
    date: 'Fri, 15 Sep 2026',
    time: '11:00 AM',
    due: 'In 42 days',
  },
  {
    day: '22',
    month: 'SEP',
    title: 'Menu Tasting',
    date: 'Fri, 22 Sep 2026',
    time: '4:00 PM',
    due: 'In 49 days',
  },
  {
    day: '05',
    month: 'OCT',
    title: 'Outfit Finalization',
    date: 'Mon, 05 Oct 2026',
    time: '2:00 PM',
    due: 'In 62 days',
  },
] as const

export const activities = [
  {
    title: 'Pastel mandap setup added to Moodboard',
    meta: 'Neha Sharma - 2h ago',
    tone: 'rose',
    thumbnail: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=160&q=80',
  },
  {
    title: 'Payment received from client',
    meta: 'INR 1,00,000 - 4h ago',
    tone: 'green',
    thumbnail: null,
  },
  {
    title: 'Mehendi decor folder created',
    meta: 'Riya Mehta - 6h ago',
    tone: 'gold',
    thumbnail: null,
  },
  {
    title: 'Catering vendor updated menu',
    meta: 'Vivaan Caterers - 1d ago',
    tone: 'purple',
    thumbnail: null,
  },
] as const

export const moodboardSectionPresets = [
  { label: 'Haldi', tone: 'gold' },
  { label: 'Mehendi', tone: 'green' },
  { label: 'Sangeet', tone: 'purple' },
  { label: 'Wedding', tone: 'rose' },
  { label: 'Reception', tone: 'blue' },
] as const

export const toneClasses: Record<string, string> = {
  rose: 'bg-[#FFF0EE] text-[#D77474]',
  green: 'bg-[#EAF6EF] text-[#5DAE78]',
  gold: 'bg-[#FFF4DC] text-[#D8A248]',
  purple: 'bg-[#F1EAFB] text-[#9A78D4]',
  blue: 'bg-[#EAF6FD] text-[#5EA5CF]',
}
