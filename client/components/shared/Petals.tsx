'use client'

import type { CSSProperties } from 'react'
import { usePetals, type Petal } from '@/hooks'

export interface PetalsProps {
  count?: number
}

interface PetalStyle extends CSSProperties {
  '--sway-x'?: string
}

/**
 * Luxurious flowing petal shower rendered as a fixed overlay.
 * Uses only petal silhouettes \u2013 no circles / round flowers.
 */
export default function Petals({ count = 38 }: PetalsProps) {
  const petals = usePetals(count)

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {petals.map((p: Petal) => {
        const style: PetalStyle = {
          left: `${p.left}%`,
          width: `${p.size}px`,
          height: `${p.size * 1.35}px`,
          animationDelay: `-${p.delay}s`,
          animationDuration: `${p.duration}s`,
          '--sway-x': `${p.swayX}px`,
          opacity: p.opacity,
          transform: `rotate(${p.tilt}deg)`,
        }

        const gradientId = `pg-${p.id}`
        const gradient = (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={p.hue2} stopOpacity="0.9" />
              <stop offset="100%" stopColor={p.hue} stopOpacity="1" />
            </linearGradient>
          </defs>
        )

        if (p.variant === 0) {
          return (
            <svg key={p.id} viewBox="0 0 24 32" className="petal" style={style}>
              {gradient}
              <path
                d="M12 1 C 19 9, 22 18, 12 31 C 2 18, 5 9, 12 1 Z"
                fill={`url(#${gradientId})`}
              />
              <path
                d="M12 4 C 15 12, 15 20, 12 28"
                stroke={p.hue2}
                strokeWidth="0.5"
                fill="none"
                opacity="0.5"
              />
            </svg>
          )
        }

        if (p.variant === 1) {
          return (
            <svg key={p.id} viewBox="0 0 28 32" className="petal" style={style}>
              {gradient}
              <path
                d="M14 2 C 24 8, 26 20, 20 30 C 15 26, 10 26, 6 30 C 2 22, 6 10, 14 2 Z"
                fill={`url(#${gradientId})`}
              />
              <path
                d="M14 5 C 16 12, 15 22, 13 28"
                stroke={p.hue2}
                strokeWidth="0.4"
                fill="none"
                opacity="0.4"
              />
            </svg>
          )
        }

        return (
          <svg key={p.id} viewBox="0 0 20 36" className="petal" style={style}>
            {gradient}
            <path
              d="M10 1 C 17 12, 16 24, 10 35 C 4 24, 3 12, 10 1 Z"
              fill={`url(#${gradientId})`}
            />
          </svg>
        )
      })}
    </div>
  )
}
