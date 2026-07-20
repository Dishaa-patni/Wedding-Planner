import {
  MessageSquareHeart,
  Sparkles,
  Users,
  ClipboardList,
  Store,
  Wallet,
} from 'lucide-react'
import type { WorkflowStep, RoleOption } from '@/types/auth'

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 'inquiry',
    title: 'Client Inquiry',
    description: 'Capture leads with elegance',
    icon: MessageSquareHeart,
  },
  {
    id: 'planning',
    title: 'Wedding Planning',
    description: 'Timeline & moodboards',
    icon: Sparkles,
  },
  {
    id: 'team',
    title: 'Team Assignment',
    description: 'Roles for every planner',
    icon: Users,
  },
  {
    id: 'guests',
    title: 'Guest List & RSVP',
    description: 'CSV import & tracking',
    icon: ClipboardList,
  },
  {
    id: 'vendors',
    title: 'Vendor Management',
    description: 'Bookings & contracts',
    icon: Store,
  },
  {
    id: 'payments',
    title: 'Payment Tracking',
    description: 'Invoices & payouts',
    icon: Wallet,
  },
]

export const ROLE_OPTIONS: RoleOption[] = [
  {
    value: 'admin',
    label: 'Studio Admin',
    description: 'Create & own the workspace',
  },
  {
    value: 'team',
    label: 'Team Member',
    description: 'Join with an invite code',
  },
]

export const AUTH_COPY = {
  signup: {
    heading: 'Create your workspace',
    subheading: 'Manage every wedding from a single, elegant place.',
    submit: 'Create Workspace',
    submitTeam: 'Join Workspace',
    googleLabel: 'Sign up with Google',
    footerText: 'Already have an account?',
    footerLink: 'Log in',
    footerHref: '/login',
    orDivider: 'or sign up with email',
  },
  login: {
    heading: 'Welcome back',
    subheading: 'Log in to continue planning beautiful weddings.',
    submit: 'Sign in',
    googleLabel: 'Sign in with Google',
    footerText: "Don't have an account?",
    footerLink: 'Sign up',
    footerHref: '/signup',
    orDivider: 'or sign in with email',
  },
} as const

/** Step activation timing for the workflow animation. */
export const WORKFLOW_STEP_MS = 1100
export const WORKFLOW_HAND_MOVE_MS = 380
export const WORKFLOW_CLICK_DELAY_MS = 420
export const WORKFLOW_RESET_MS = 550
