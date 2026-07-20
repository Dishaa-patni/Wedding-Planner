import type { ComponentType, SVGProps } from 'react'

export type LucideIcon = ComponentType<SVGProps<SVGSVGElement>>

export type PropsWithChildren<P = Record<string, unknown>> = P & {
  children?: React.ReactNode
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
