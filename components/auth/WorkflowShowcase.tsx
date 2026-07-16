'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WorkflowCard from './WorkflowCard'
import {
  WORKFLOW_STEPS,
  WORKFLOW_STEP_MS,
  WORKFLOW_CLICK_DELAY_MS,
  WORKFLOW_RESET_MS,
} from '@/constants/auth'

/** Alternating offsets so cards feel organic (matches the reference sketch). */
const OFFSETS = [-40, 30, -20, 40, -30, 20]

type Phase = 'moving' | 'clicked'

function HandCursor({ x, y, clicking }: { x: number; y: number; clicking: boolean }) {
  return (
    <motion.div
      className="absolute z-40 pointer-events-none"
      animate={{ x, y, scale: clicking ? 0.9 : 1 }}
      transition={{
        x: { duration: 0.9, ease: 'easeInOut' },
        y: { duration: 0.9, ease: 'easeInOut' },
        scale: { duration: 0.2, ease: 'easeOut' },
      }}
      style={{ top: 0, left: 0 }}
    >
      <div className="relative">
        <div className="absolute -inset-3 rounded-full bg-[#D8B26E]/25 blur-xl" />
        <svg width="36" height="36" viewBox="0 0 36 36" className="relative drop-shadow-lg">
          <defs>
            <linearGradient id="cursor-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F6DDE1" />
            </linearGradient>
          </defs>
          <path
            d="M8 6 L8 24 L13 20 L16 27 L20 25 L17 18 L23 18 Z"
            fill="url(#cursor-grad)"
            stroke="#B76E79"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </motion.div>
  )
}

function ConnectorArrow({
  from,
  to,
  visible,
}: {
  from: { x: number; y: number }
  to: { x: number; y: number }
  visible: boolean
}) {
  const midY = (from.y + to.y) / 2
  const path = `M ${from.x} ${from.y} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y - 6}`
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="arrow-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B76E79" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D8B26E" stopOpacity="0.9" />
        </linearGradient>
        <marker id="arrow-head" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#D8B26E" />
        </marker>
      </defs>
      <motion.path
        d={path}
        stroke="url(#arrow-grad)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        markerEnd="url(#arrow-head)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      />
    </svg>
  )
}

export default function WorkflowShowcase() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const [step, setStep] = useState(0)
  const [phase, setPhase] = useState<Phase>('moving')
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([])

  // Measure card centres so the hand cursor and arrows land exactly.
  useEffect(() => {
    const measure = () => {
      const container = containerRef.current
      if (!container) return
      const containerRect = container.getBoundingClientRect()
      const points = cardRefs.current.map((el) => {
        if (!el) return { x: 0, y: 0 }
        const rect = el.getBoundingClientRect()
        return {
          x: rect.left - containerRect.left + 34, // radio button centre
          y: rect.top - containerRect.top + rect.height / 2,
        }
      })
      setPositions(points)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Sequencer: move -> click -> next.
  useEffect(() => {
    if (positions.length === 0) return
    const isLast = step >= WORKFLOW_STEPS.length - 1
    if (phase === 'moving') {
      const t = setTimeout(() => setPhase('clicked'), WORKFLOW_CLICK_DELAY_MS)
      return () => clearTimeout(t)
    }
    const delay = isLast ? WORKFLOW_STEP_MS + WORKFLOW_RESET_MS : WORKFLOW_STEP_MS
    const t = setTimeout(() => {
      if (isLast) {
        setStep(0)
      } else {
        setStep((s) => s + 1)
      }
      setPhase('moving')
    }, delay)
    return () => clearTimeout(t)
  }, [step, phase, positions.length])

  const activeStep = step
  const isClicked = phase === 'clicked'
  const target = positions[activeStep] || { x: 0, y: 0 }
  const nextTarget = positions[activeStep + 1]

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-md mx-auto flex flex-col items-stretch gap-4 py-6"
    >
      {WORKFLOW_STEPS.map((s, i) => (
        <div
          key={s.id}
          ref={(el) => {
            cardRefs.current[i] = el
          }}
          className={i % 2 === 0 ? 'self-start' : 'self-end'}
        >
          <WorkflowCard
            step={s}
            index={i}
            isActive={i === activeStep}
            isComplete={i < activeStep || (i === activeStep && isClicked)}
            offsetX={OFFSETS[i] ?? 0}
          />
        </div>
      ))}

      {nextTarget && isClicked && (
        <ConnectorArrow from={target} to={nextTarget} visible />
      )}

      <AnimatePresence>
        {positions.length > 0 && (
          <HandCursor
            x={target.x - 6}
            y={target.y - 4}
            clicking={isClicked}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
