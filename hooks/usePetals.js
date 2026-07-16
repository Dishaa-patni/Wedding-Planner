'use client'

import { useEffect, useState } from 'react'
import { PETAL_PALETTE } from '@/constants'

/**
 * Generate a stable, randomised set of falling petals for the hero shower.
 * Runs once on the client to avoid SSR/hydration mismatches.
 */
export function usePetals(count = 38) {
  const [petals, setPetals] = useState([])

  useEffect(() => {
    const random = (min, max) => min + Math.random() * (max - min)
    const pickHue = () => PETAL_PALETTE[Math.floor(Math.random() * PETAL_PALETTE.length)]

    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: random(0, 100),
      delay: random(0, 22),
      duration: random(20, 42),
      size: random(12, 32),
      hue: pickHue(),
      hue2: pickHue(),
      swayX: random(30, 170),
      opacity: random(0.4, 0.8),
      variant: i % 3,
      tilt: random(-30, 30),
    }))

    setPetals(generated)
  }, [count])

  return petals
}
