'use client'

import { motion } from 'framer-motion'
import { ROLE_OPTIONS } from '@/constants/auth'
import type { UserRole } from '@/types/auth'

export interface RoleToggleProps {
  value: UserRole
  onChange: (role: UserRole) => void
}

/**
 * Segmented toggle to pick between Studio Admin and Team Member roles.
 * Uses a sliding pill indicator for a smooth premium feel.
 */
export default function RoleToggle({ value, onChange }: RoleToggleProps) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-foreground/50 mb-2">
        I am signing in as
      </div>
      <div className="relative grid grid-cols-2 p-1 rounded-full bg-white/70 border border-[#B76E79]/20 shadow-inner">
        <motion.div
          className="absolute top-1 bottom-1 rounded-full gradient-rose shadow"
          initial={false}
          animate={{ left: value === 'admin' ? '4px' : '50%', right: value === 'admin' ? '50%' : '4px' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
        {ROLE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`relative z-10 py-2 text-sm font-medium rounded-full transition-colors ${
              value === option.value ? 'text-white' : 'text-foreground/70 hover:text-[#B76E79]'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="text-[11px] text-foreground/55 mt-2">
        {ROLE_OPTIONS.find((o) => o.value === value)?.description}
      </div>
    </div>
  )
}
