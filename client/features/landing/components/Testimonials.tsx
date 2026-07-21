'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { TESTIMONIALS } from '@/constants'
import type { Testimonial } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial
  index: number
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="glass rounded-2xl p-7 h-full border-white/70 relative overflow-hidden">
        <div className="flex text-amber-500 mb-4">
          {[...Array(testimonial.rating)].map((_, k) => (
            <Star key={k} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <p className="text-foreground/80 leading-relaxed text-[15px]">
          “{testimonial.quote}”
        </p>
        <div className="mt-6 flex items-center gap-3">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-11 h-11 rounded-full ring-2 ring-white shadow"
          />
          <div>
            <div className="font-medium">{testimonial.name}</div>
            <div className="text-xs text-foreground/60">{testimonial.role}</div>
          </div>
        </div>
        <div className="absolute top-4 right-4 font-display text-6xl text-[#B76E79]/15 leading-none select-none">
          “
        </div>
      </Card>
    </motion.div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            Trusted by the <span className="gradient-text">planners</span> who make magic
          </h2>
          <div className="gold-divider mt-8 max-w-xs mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
