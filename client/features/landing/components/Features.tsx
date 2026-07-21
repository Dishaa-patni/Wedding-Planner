'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { FEATURES } from '@/constants'
import type { Feature } from '@/types'

interface FeatureCardProps {
  feature: Feature
  index: number
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = feature.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
    >
      <Card className="h-full group relative overflow-hidden glass border-white/70 rounded-2xl p-6 md:p-7 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-xl gradient-rose flex items-center justify-center shadow-lg shadow-[#B76E79]/20 group-hover:scale-110 transition-transform">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <Badge
            variant="outline"
            className="border-[#B76E79]/30 text-[#B76E79] bg-white/60 text-[10px] tracking-widest uppercase"
          >
            {feature.tag}
          </Badge>
        </div>
        <h3 className="font-display text-2xl mt-5 text-foreground">{feature.title}</h3>
        <p className="mt-2 text-foreground/65 leading-relaxed">{feature.description}</p>
        <div className="mt-5 flex items-center text-sm text-[#B76E79] gap-1 opacity-70 group-hover:opacity-100 transition">
          Learn more <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Card>
    </motion.div>
  )
}

export default function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-foreground/70 mb-5">
            <Sparkles className="h-3 w-3 text-[#B76E79]" /> Everything you need. Nothing you don&apos;t.
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
            A single, <span className="gradient-text">graceful workspace</span>
            <br /> for the entire wedding
          </h2>
          <div className="gold-divider mt-8 max-w-xs mx-auto" />
          <p className="mt-6 text-foreground/70 text-lg">
            Eight thoughtfully designed modules that replace the chaos of spreadsheets, WhatsApp groups and sticky notes.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
