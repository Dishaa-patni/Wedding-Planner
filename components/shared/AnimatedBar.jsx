'use client'

import { useEffect, useState } from 'react'

/**
 * Animated horizontal progress bar. Fills from 0 to `pct`% after mount.
 */
export default function AnimatedBar({
  pct = 0,
  delay = 0,
  className = 'gradient-rose',
  trackClassName = 'bg-[#F1D9DE]/70',
  height = 'h-1.5',
}) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setWidth(pct), 200 + delay)
    return () => clearTimeout(timer)
  }, [pct, delay])

  return (
    <div className={`${height} rounded-full ${trackClassName} overflow-hidden`}>
      <div
        className={`h-full ${className} rounded-full`}
        style={{
          width: `${width}%`,
          transition: 'width 1.4s cubic-bezier(.2,.8,.2,1)',
        }}
      />
    </div>
  )
}
