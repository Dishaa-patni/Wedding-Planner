'use client'

import { useEffect, useState } from 'react'

/**
 * Returns `true` when the window has been scrolled past `threshold` pixels.
 */
export function useIsScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
