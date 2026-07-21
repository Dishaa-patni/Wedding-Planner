'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PRICING_PLANS } from '@/constants'
import type { PricingPlan } from '@/types'

interface PricingCardProps {
  plan: PricingPlan
  index: number
}

function PricingCard({ plan, index }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative ${plan.highlight ? 'md:-mt-4' : ''}`}
    >
      {plan.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <Badge className="bg-[#B76E79] hover:bg-[#B76E79] text-white shadow-lg px-3 py-1 rounded-full">
            Most Popular
          </Badge>
        </div>
      )}
      <Card
        className={`rounded-2xl p-8 h-full transition-all ${
          plan.highlight
            ? 'glass-strong border-[#B76E79]/30 shadow-2xl'
            : 'glass border-white/70'
        } hover:-translate-y-1`}
      >
        <div className="text-xs uppercase tracking-widest text-foreground/50">{plan.name}</div>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="font-display text-5xl text-foreground">{plan.price}</span>
          <span className="text-foreground/60">{plan.period}</span>
        </div>
        <p className="mt-2 text-sm text-foreground/60">{plan.tagline}</p>
        <div className="gold-divider my-6" />
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-3 text-sm">
              <div
                className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  plan.highlight ? 'bg-[#B76E79] text-white' : 'bg-[#B76E79]/10 text-[#B76E79]'
                }`}
              >
                <Check className="h-3 w-3" />
              </div>
              <span className="text-foreground/75">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className={`w-full mt-8 rounded-full py-6 ${
            plan.highlight
              ? 'bg-[#B76E79] hover:bg-[#a55e69] text-white shadow-lg'
              : 'bg-white/80 hover:bg-white text-[#B76E79] border border-[#B76E79]/30'
          }`}
        >
          {plan.ctaLabel}
        </Button>
      </Card>
    </motion.div>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            Simple, <span className="gradient-text">graceful pricing</span>
          </h2>
          <p className="mt-5 text-foreground/70 text-lg">
            Pick a plan that fits your studio. Cancel anytime. No credit card required for the 14-day trial.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
