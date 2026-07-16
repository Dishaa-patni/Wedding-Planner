'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, Sparkles, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HERO, HERO_AVATARS, SOCIAL_PROOF } from '@/constants'
import WeddingWorkspace from './WeddingWorkspace'

function HeroBadge({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs md:text-sm text-foreground/75 mb-6 border border-[#EAC7CE]/60"
    >
      <Sparkles className="h-3.5 w-3.5 text-[#B76E79]" />
      <span className="tracking-wide">{text}</span>
    </motion.div>
  )
}

function HeroCopy() {
  const { line1, accent, line2, italic } = HERO.headline
  return (
    <>
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.6rem] leading-[1.05] tracking-tight text-foreground">
        {line1} <span className="gradient-text">{accent}</span>
        <br className="hidden md:block" />
        {line2} <span className="italic text-[#B76E79]">{italic}</span>
      </h1>
      <p className="mt-6 text-lg md:text-xl leading-relaxed text-foreground/70 max-w-xl">
        {HERO.subheading}
      </p>
    </>
  )
}

function HeroCtas() {
  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
      <Button
        size="lg"
        className="bg-[#B76E79] hover:bg-[#a55e69] text-white rounded-full px-7 py-6 text-base shadow-lg hover:shadow-xl transition-all group"
      >
        {HERO.primaryCta}
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="rounded-full px-7 py-6 text-base border-[#B76E79]/40 text-[#B76E79] hover:bg-[#B76E79]/10 hover:text-[#B76E79] bg-white/50 backdrop-blur"
      >
        <Play className="mr-2 h-4 w-4" />
        {HERO.secondaryCta}
      </Button>
    </div>
  )
}

function HeroSocialProof() {
  return (
    <div className="mt-10 flex items-center gap-6 md:gap-8">
      <div className="flex -space-x-3">
        {HERO_AVATARS.map((a) => (
          <img
            key={a.name}
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(a.name)}&background=${a.bg}&color=fff&size=64`}
            alt=""
            className="w-9 h-9 rounded-full border-2 border-white shadow"
          />
        ))}
      </div>
      <div className="text-sm">
        <div className="flex items-center gap-1 text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" />
          ))}
          <span className="ml-1 text-foreground/80 font-medium">{SOCIAL_PROOF.rating}</span>
        </div>
        <div className="text-foreground/60">{SOCIAL_PROOF.ratingLabel}</div>
      </div>
    </div>
  )
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, -60])
  const yRight = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(1000px 500px at 15% 20%, rgba(216,178,110,0.10), transparent 60%), radial-gradient(900px 500px at 85% 30%, rgba(234,199,206,0.20), transparent 60%)',
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div
            style={{ y: yLeft }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="lg:col-span-7 relative z-10"
          >
            <HeroBadge text={HERO.badge} />
            <HeroCopy />
            <HeroCtas />
            <HeroSocialProof />
          </motion.div>

          <motion.div
            style={{ y: yRight }}
            initial={{ opacity: 0, scale: 0.94, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            <WeddingWorkspace />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
