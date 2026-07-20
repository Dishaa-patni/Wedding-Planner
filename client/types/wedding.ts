export interface Guests {
  confirmed: number
  pending: number
  total: number
  rsvpPct: number
}

export interface Budget {
  totalLakhs: number
  utilizedPct: number
}

export interface Team {
  count: number
  members: string[]
  extra: number
}

export interface Payment {
  amount: string
  dueInDays: number
}

export interface Couple {
  first: string
  second: string
}

export interface Wedding {
  id?: string
  couple: Couple
  date: string
  venue: string
  progress: number
  guests: Guests
  budget: Budget
  team: Team
  payment: Payment
}
