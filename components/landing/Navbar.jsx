'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Flower2, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useIsScrolled } from '@/hooks'
import { NAV_LINKS, SITE } from '@/constants'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useIsScrolled(20)

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={`glass rounded-full px-4 md:px-6 py-2.5 flex items-center justify-between transition-all duration-500 ${
            scrolled ? 'shadow-lg' : ''
          }`}
        >
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full gradient-rose flex items-center justify-center shadow-md">
              <Flower2 className="w-4 h-4 text-white" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-xl text-[#B76E79]">{SITE.name}</div>
              <div className="text-[9px] tracking-[0.25em] uppercase text-foreground/50 -mt-0.5 hidden sm:block">
                {SITE.tagline}
              </div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-foreground/75 hover:text-[#B76E79] rounded-lg hover:bg-white/60 transition"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <Button
              variant="ghost"
              className="hidden sm:inline-flex text-foreground/80 hover:text-[#B76E79] hover:bg-white/60 rounded-full"
            >
              Login
            </Button>
            <Button className="bg-[#B76E79] hover:bg-[#a55e69] text-white shadow-md hover:shadow-lg transition-all rounded-full px-4 md:px-5">
              Start Free Trial <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <button
              className="lg:hidden p-2 text-foreground/80"
              onClick={() => setOpen(!open)}
              aria-label="menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 glass rounded-2xl p-3 space-y-1"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm rounded-lg hover:bg-white/70 hover:text-[#B76E79]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#"
                className="block px-4 py-2.5 text-sm rounded-lg hover:bg-white/70 hover:text-[#B76E79]"
              >
                Login
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
