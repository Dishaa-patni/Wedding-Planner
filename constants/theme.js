/**
 * Centralised design tokens. Prefer these over hardcoded values in components.
 */

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
}

export const RADII = {
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  pill: '9999px',
}

export const BACKGROUND_IMAGE_URL =
  "https://customer-assets-39nsmqrw.emergentagent.net/job_weddings-hub-7/artifacts/wshm155x_ChatGPT%20Image%20Jul%2015%2C%202026%2C%2009_38_19%20PM.png"

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
}

export const FADE_IN_UP = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7 },
}

export const FADE_IN = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 },
}

export const PETAL_PALETTE = [
  '#EAC7CE',
  '#F6DDE1',
  '#FBE9CF',
  '#D8B26E',
  '#F0D6D6',
  '#FADCDE',
  '#E7B7B0',
  '#F5CBD1',
]
