/**
 * Reusable, pure formatters.
 */

export const formatCurrencyINR = (rupees: number): string =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rupees)

export const formatLakhs = (lakhs: number): string => `\u20b9${lakhs.toFixed(1)}L`

export const clamp = (value: number, min = 0, max = 100): number =>
  Math.min(max, Math.max(min, value))

export const percentage = (value: number, total: number): number => {
  if (!total) return 0
  return clamp(Math.round((value / total) * 100))
}

export const buildAvatarUrl = (name: string, background = 'B76E79'): string =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${background}&color=fff&size=128`
