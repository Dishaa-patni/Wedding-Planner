import type { Testimonial, Avatar } from '@/types'

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
