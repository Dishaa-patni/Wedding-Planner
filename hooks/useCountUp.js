'use client'

import { useEffect, useState } from 'react'

/**
 * Animate a numeric value from `start` to `end` over `duration` ms.
 * Uses requestAnimationFrame with an ease-out cubic for a premium feel.
 */
export function useCountUp(end, duration = 1400, start = 0) {
  const [value, setValue] = useState(start)

  useEffect(() => {
    let raf
    let startTs

    const step = (ts) => {
      if (!startTs) startTs = ts
      const progress = Math.min((ts - startTs) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(start + (end - start) * eased))
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [end, duration, start])

  return value
}
