'use client'

import { TRUSTED_BRANDS } from '@/constants'

export default function TrustedStrip() {
  return (
    <section className="relative py-10 border-y border-[#EAC7CE]/30 bg-white/40 backdrop-blur">
      <div className="container mx-auto px-6">
        <div className="text-center text-xs tracking-[0.3em] uppercase text-foreground/50 mb-6">
          Trusted by boutique wedding studios across India
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 opacity-80">
          {TRUSTED_BRANDS.map((brand) => (
            <div
              key={brand}
              className="font-display text-lg md:text-xl text-foreground/60 hover:text-[#B76E79] transition-colors"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
