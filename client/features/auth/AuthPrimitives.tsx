'use client'

import type { ReactNode } from 'react'

export function GoogleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.4c-.24 1.4-1.68 4.1-5.4 4.1-3.25 0-5.9-2.7-5.9-6s2.65-6 5.9-6c1.85 0 3.09.79 3.8 1.47l2.6-2.5C16.9 3.6 14.7 2.6 12 2.6 6.9 2.6 2.8 6.7 2.8 12S6.9 21.4 12 21.4c6.94 0 9.35-4.87 9.35-8.4 0-.56-.06-.99-.14-1.4H12z"
      />
      <path fill="#4285F4" d="M21.35 12c0-.56-.06-.99-.14-1.4H12v3.9h5.4c-.11.6-.42 1.35-1 2.02l3.2 2.5c1.9-1.75 2.75-4.35 2.75-7.02z" />
      <path fill="#FBBC05" d="M5.6 14.9a5.94 5.94 0 010-3.8L2.4 8.6a9.4 9.4 0 000 8.8l3.2-2.5z" />
      <path fill="#34A853" d="M12 21.4c2.7 0 4.9-.9 6.55-2.44l-3.2-2.5c-.86.58-2 1-3.35 1-2.55 0-4.72-1.7-5.5-4l-3.2 2.5C4.9 19.4 8.2 21.4 12 21.4z" />
    </svg>
  )
}

export function OrDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px gold-divider" />
      <span className="whitespace-nowrap text-[10px] sm:text-[11px] uppercase tracking-widest text-foreground/50">
        {label}
      </span>
      <div className="flex-1 h-px gold-divider" />
    </div>
  )
}

export function FieldGroup({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="text-[11px] uppercase tracking-widest text-foreground/60 font-medium"
      >
        {label}
      </label>
      {children}
    </div>
  )
}
