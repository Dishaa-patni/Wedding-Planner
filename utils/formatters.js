/**
 * Simple, reusable formatters. Keep pure and side-effect free.
 */

export const formatCurrencyINR = (rupees) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rupees)

export const formatLakhs = (lakhs) => `₹${lakhs.toFixed(1)}L`

export const clamp = (value, min = 0, max = 100) =>
  Math.min(max, Math.max(min, value))

export const percentage = (value, total) => {
  if (!total) return 0
  return clamp(Math.round((value / total) * 100))
}

export const buildAvatarUrl = (name, background = 'B76E79') =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${background}&color=fff&size=128`
