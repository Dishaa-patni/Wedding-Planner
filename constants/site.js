/**
 * Global site configuration and navigation.
 */

export const SITE = {
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
}

export const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#dashboard', label: 'Dashboard' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

export const FOOTER_LINKS = [
  { heading: 'Product', links: ['Features', 'Dashboard', 'Pricing', 'Integrations', 'Changelog'] },
  { heading: 'Company', links: ['About', 'Careers', 'Press', 'Contact', 'Blog'] },
  { heading: 'Resources', links: ['Help center', 'Templates', 'Guides', 'API', 'Status'] },
]

export const SOCIAL_PROOF = {
  studioCount: 500,
  rating: 4.9,
  ratingLabel: 'Loved by 500+ planning studios',
}

export const HERO = {
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
