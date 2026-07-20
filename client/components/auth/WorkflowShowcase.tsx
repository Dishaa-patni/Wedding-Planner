'use client'

import { useEffect, useState } from 'react'
import { LayoutGroup } from 'framer-motion'
import WorkflowCard from './WorkflowCard'
import {
  WORKFLOW_STEPS,
  WORKFLOW_STEP_MS,
  WORKFLOW_CLICK_DELAY_MS,
  WORKFLOW_RESET_MS,
} from '@/constants/auth'

/** Inward offsets keep the staggered cards visible at laptop widths. */
const OFFSETS = [0, -18, 14, -12, 8, -20]

type Phase = 'moving' | 'clicked'

export default function WorkflowShowcase() {
  const [step, setStep] = useState(0)
  const [phase, setPhase] = useState<Phase>('moving')

  // Sequencer: move -> click -> next.
  useEffect(() => {
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
  }, [step, phase])

  const activeStep = step
  const isClicked = phase === 'clicked'

  return (
    <LayoutGroup>
      <div className="relative w-full max-w-md mx-auto flex flex-col items-stretch gap-4 py-6">
        {WORKFLOW_STEPS.map((s, i) => (
          <div key={s.id} className={i % 2 === 0 ? 'self-start' : 'self-end'}>
            <WorkflowCard
              step={s}
              index={i}
              isActive={i === activeStep}
              isComplete={i < activeStep || (i === activeStep && isClicked)}
              isClicking={i === activeStep && isClicked}
              offsetX={OFFSETS[i] ?? 0}
            />
          </div>
        ))}
      </div>
    </LayoutGroup>
  )
}
