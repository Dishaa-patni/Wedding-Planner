/**
 * Shared JSDoc typedefs used across the frontend.
 * When we migrate to TypeScript these become real interfaces.
 *
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {'planner'|'coordinator'|'assistant'|'admin'} role
 *
 * @typedef {Object} Wedding
 * @property {string} id
 * @property {string} coupleFirst
 * @property {string} coupleSecond
 * @property {string} date          ISO date
 * @property {string} venue
 * @property {number} progress      0-100
 * @property {Guests} guests
 * @property {Budget} budget
 * @property {Team} team
 *
 * @typedef {Object} Guests
 * @property {number} confirmed
 * @property {number} pending
 * @property {number} total
 * @property {number} rsvpPct
 *
 * @typedef {Object} Budget
 * @property {number} totalLakhs
 * @property {number} utilizedPct
 *
 * @typedef {Object} Team
 * @property {number} count
 * @property {string[]} members
 * @property {number} extra
 *
 * @typedef {Object} Vendor
 * @property {string} name
 * @property {import('react').ComponentType} icon
 * @property {'done'|'pending'|'in-progress'} status
 *
 * @typedef {Object} TimelineItem
 * @property {string} name
 * @property {'done'|'today'|'tomorrow'|'upcoming'} status
 * @property {string} icon
 *
 * @typedef {Object} Feature
 * @property {import('react').ComponentType} icon
 * @property {string} title
 * @property {string} description
 * @property {string} tag
 *
 * @typedef {Object} Testimonial
 * @property {string} name
 * @property {string} role
 * @property {string} quote
 * @property {number} rating
 * @property {string} avatar
 *
 * @typedef {Object} PricingPlan
 * @property {string} name
 * @property {string} price
 * @property {string} period
 * @property {string} tagline
 * @property {string[]} features
 * @property {boolean} highlight
 * @property {string} ctaLabel
 *
 * @typedef {Object} Payment
 * @property {string} amount
 * @property {number} dueInDays
 *
 * @typedef {Object} Notification
 * @property {string} id
 * @property {string} label
 * @property {string} title
 * @property {string} detail
 */

export {}
