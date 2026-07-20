import type { PricingPlan } from '@/types'

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
