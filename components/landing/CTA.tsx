'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HERO } from '@/constants'

export default function CTA() {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative rounded-3xl overflow-hidden gradient-rose p-10 md:p-16 text-center text-white shadow-2xl">
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              background:
                'radial-gradient(400px 200px at 20% 30%, rgba(255,255,255,0.4), transparent 60%), radial-gradient(400px 200px at 80% 70%, rgba(255,220,180,0.5), transparent 60%)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative z-10 max-w-2xl mx-auto"
          >
            <h3 className="font-display text-3xl md:text-5xl leading-tight">
              Ready to plan weddings <em className="not-italic">effortlessly</em>?
            </h3>
            <p className="mt-4 text-white/85 text-lg">
              Join 500+ wedding studios using Vivaha. 14-day free trial. No credit card.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-white text-[#B76E79] hover:bg-white/90 rounded-full px-7 py-6 shadow-xl"
              >
                {HERO.primaryCta} <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white rounded-full px-7 py-6"
              >
                {HERO.secondaryCta}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
