'use client'

import { useEffect, useState } from 'react'

/**
 * Rose-gold gradient circular progress ring with animated stroke.
 */
export default function CircularProgress({
  value = 0,
  size = 88,
  stroke = 8,
  gradientId = 'ring-gradient',
  label = 'Progress',
}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 200)
    return () => clearTimeout(timer)
  }, [value])

  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B76E79" />
            <stop offset="100%" stopColor="#D8B26E" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F1D9DE"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(.2,.8,.2,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-display text-xl leading-none text-[#B76E79]">{progress}%</div>
        <div className="text-[8px] uppercase tracking-widest text-foreground/50 mt-0.5">
          {label}
        </div>
      </div>
    </div>
  )
}
