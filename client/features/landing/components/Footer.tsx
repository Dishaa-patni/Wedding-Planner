'use client'

import { Flower2, Heart, Shield } from 'lucide-react'
import { FOOTER_LINKS, SITE } from '@/constants'

function FooterBrand() {
  return (
    <div className="md:col-span-2">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full gradient-rose flex items-center justify-center shadow-md">
          <Flower2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-display text-2xl text-[#B76E79]">{SITE.name}</div>
          <div className="text-[10px] tracking-[0.2em] uppercase text-foreground/50">
            {SITE.tagline}
          </div>
        </div>
      </div>
      <p className="mt-4 text-foreground/70 max-w-sm">
        A calmer, more elegant way to run a wedding planning business. Made with love in India, for the world&apos;s most magical weddings.
      </p>
      <div className="flex items-center gap-2 mt-5 text-xs text-foreground/60">
        <Shield className="h-3.5 w-3.5 text-[#B76E79]" /> SOC 2 · ISO-27001 hosted · GDPR ready
      </div>
    </div>
  )
}

function FooterLinks() {
  return (
    <>
      {FOOTER_LINKS.map((section) => (
        <div key={section.heading}>
          <div className="text-xs uppercase tracking-widest text-foreground/50 mb-4">
            {section.heading}
          </div>
          <ul className="space-y-2.5">
            {section.links.map((label) => (
              <li key={label}>
                <a href="#" className="text-sm text-foreground/75 hover:text-[#B76E79] transition">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}

function FooterBottom() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/60">
      <div>
        © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
      </div>
      <div className="flex items-center gap-5">
        <a href="#" className="hover:text-[#B76E79]">Privacy</a>
        <a href="#" className="hover:text-[#B76E79]">Terms</a>
        <a href="#" className="hover:text-[#B76E79]">Security</a>
        <span className="flex items-center gap-1">
          Crafted with <Heart className="h-3 w-3 fill-[#B76E79] text-[#B76E79]" /> in {SITE.city}
        </span>
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-8 border-t border-[#EAC7CE]/30 bg-white/40 backdrop-blur">
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid md:grid-cols-5 gap-10">
          <FooterBrand />
          <FooterLinks />
        </div>
        <div className="gold-divider my-10" />
        <FooterBottom />
      </div>
    </footer>
  )
}
