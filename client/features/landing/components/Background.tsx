'use client'

import { BACKGROUND_IMAGE_URL } from '@/constants'

/**
 * Fixed watercolor floral background + soft ivory wash for readability.
 */
export default function Background() {
  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          opacity: 0.95,
        }}
      />
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,249,246,0.15) 0%, rgba(255,249,246,0.35) 55%, rgba(255,249,246,0.5) 100%)',
        }}
      />
    </>
  )
}
