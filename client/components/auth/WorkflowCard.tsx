'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { WORKFLOW_HAND_MOVE_MS } from '@/constants/auth'
import type { WorkflowStep } from '@/types/auth'

export interface WorkflowCardProps {
  step: WorkflowStep
  index: number
  isActive: boolean
  isComplete: boolean
  isClicking: boolean
  offsetX: number
}

const CURSOR_TIP = { x: 8, y: 6 }

function HandCursor({ clicking }: { clicking: boolean }) {
  return (
    <motion.div
      layoutId="workflow-hand-cursor"
      className="absolute pointer-events-none z-30"
      style={{
        left: '50%',
        top: '50%',
        marginLeft: -CURSOR_TIP.x,
        marginTop: -CURSOR_TIP.y,
        transformOrigin: `${CURSOR_TIP.x}px ${CURSOR_TIP.y}px`,
      }}
      animate={{ scale: clicking ? 0.88 : 1 }}
      transition={{
        layout: { duration: WORKFLOW_HAND_MOVE_MS / 1000, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.14, ease: 'easeOut' },
      }}
    >
      <div className="relative">
        <motion.div
          className="absolute rounded-full bg-[#D8B26E]/30"
          style={{
            width: 28,
            height: 28,
            left: CURSOR_TIP.x - 14,
            top: CURSOR_TIP.y - 14,
            filter: 'blur(8px)',
          }}
          animate={{ opacity: clicking ? 0.85 : 0.35, scale: clicking ? 1.15 : 0.85 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
        />
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

/**
 * A single glassmorphism workflow step card.
 * Shows a radio/checkbox on the left, icon, title & description on the right.
 * When active it glows warm gold and rises slightly.
 */
export default function WorkflowCard({
  step,
  index,
  isActive,
  isComplete,
  isClicking,
  offsetX,
}: WorkflowCardProps) {
  const Icon = step.icon
  const showGlow = isActive || isComplete

  return (
    <motion.div
      initial={{ opacity: 0, x: offsetX < 0 ? -20 : 20, y: 10 }}
      animate={{ opacity: 1, x: offsetX, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.7, ease: 'easeOut' }}
      className="relative w-full max-w-[320px]"
      style={{ marginLeft: offsetX >= 0 ? `${offsetX}px` : undefined, marginRight: offsetX < 0 ? `${-offsetX}px` : undefined }}
    >
      {/* Glow layer */}
      <AnimatePresence>
        {showGlow && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute -inset-2 rounded-2xl pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, rgba(216,178,110,0.55), transparent 65%)',
              filter: 'blur(14px)',
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          borderColor: showGlow ? 'rgba(216,178,110,0.7)' : 'rgba(183,110,121,0.25)',
          boxShadow: showGlow
            ? '0 20px 50px -20px rgba(216,178,110,0.55), 0 6px 20px -10px rgba(183,110,121,0.25)'
            : '0 10px 30px -12px rgba(183,110,121,0.18)',
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative flex items-center gap-4 px-4 py-3.5 rounded-2xl border bg-white/60 backdrop-blur-xl"
      >
        {/* Radio / check */}
        <div
          data-workflow-radio
          className={`relative flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors duration-500 ${
            isComplete
              ? 'border-[#B76E79] bg-gradient-to-br from-[#B76E79] to-[#D8B26E]'
              : 'border-[#B76E79]/50 bg-white/60'
          }`}
        >
          <AnimatePresence>
            {isClicking && (
              <motion.span
                className="absolute inset-1 rounded-full bg-white/45 z-10"
                initial={{ scale: 0.25, opacity: 0.9 }}
                animate={{ scale: 1.6, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>
          {isActive && <HandCursor clicking={isClicking} />}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                className="relative z-20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </motion.div>
            )}
          </AnimatePresence>
          {isActive && !isComplete && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: [0.8, 1.5, 0.8], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full border-2 border-[#D8B26E]"
            />
          )}
        </div>

        {/* Icon chip */}
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${
            showGlow ? 'bg-gradient-to-br from-[#F6DDE1] to-[#FBE9CF]' : 'bg-white/70'
          }`}
        >
          <Icon className="w-4 h-4 text-[#B76E79]" />
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <div className="font-display text-[15px] leading-tight text-[#2E2E2E]">
            {step.title}
          </div>
          <div className="text-[11px] text-foreground/60 mt-0.5 truncate">
            {step.description}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
