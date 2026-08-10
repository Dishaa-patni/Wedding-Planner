'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Gem, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

type CreateWeddingWorkspaceModalProps = {
  open: boolean
  isSubmitting: boolean
  existingWorkspaceNames?: string[]
  onClose: () => void
  onCreate: (name: string) => void
}

const validateWorkspaceName = (name: string, existingWorkspaceNames: string[]) => {
  const trimmedName = name.trim()

  if (!trimmedName) return 'Workspace name is required'
  if (trimmedName.length < 2) return 'Workspace name must be at least 2 characters'
  if (trimmedName.length > 80) return 'Workspace name must be 80 characters or less'
  if (!/[a-zA-Z0-9]/.test(trimmedName)) {
    return 'Workspace name must contain at least one letter or number'
  }
  if (
    existingWorkspaceNames.some(
      (workspaceName) => workspaceName.trim().toLowerCase() === trimmedName.toLowerCase(),
    )
  ) {
    return 'A workspace with this name already exists'
  }

  return ''
}

export function CreateWeddingWorkspaceModal({
  open,
  isSubmitting,
  existingWorkspaceNames = [],
  onClose,
  onCreate,
}: CreateWeddingWorkspaceModalProps) {
  const [name, setName] = useState('')
  const [hasInteracted, setHasInteracted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return

    setName('')
    setHasInteracted(false)
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 80)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting) handleClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSubmitting, open])

  const validationError = validateWorkspaceName(name, existingWorkspaceNames)
  const visibleError = hasInteracted ? validationError : ''
  const canSubmit = !validationError && !isSubmitting

  const handleClose = () => {
    if (isSubmitting) return

    setName('')
    setHasInteracted(false)
    onClose()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setHasInteracted(true)

    if (!canSubmit) return

    onCreate(name.trim())
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#3B2928]/28 px-4 backdrop-blur-[6px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={handleClose}
        >
          <motion.form
            onSubmit={handleSubmit}
            className="w-full max-w-[460px] rounded-[28px] border border-[#F0DDD8] bg-white p-6 shadow-[0_28px_80px_rgba(59,41,40,0.18)]"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-workspace-title"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D77474] text-white shadow-sm">
                  <Gem className="h-5 w-5" />
                </div>
                <div>
                  <h2 id="create-workspace-title" className="font-display text-2xl text-[#3B2928]">
                    New Wedding Workspace
                  </h2>
                  <p className="mt-1 text-sm leading-5 text-[#756967]">
                    Create a planning home for a couple or wedding event.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                aria-label="Close create workspace dialog"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#756967] transition hover:bg-[#FFF0EE] hover:text-[#3B2928] disabled:pointer-events-none disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <label className="mt-8 block">
              <span className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#8A7B78]">
                Workspace Name
              </span>
              <input
                ref={inputRef}
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  setHasInteracted(true)
                }}
                onBlur={() => setHasInteracted(true)}
                placeholder="e.g. A & K Wedding"
                aria-invalid={Boolean(visibleError)}
                aria-describedby={visibleError ? 'workspace-name-error' : undefined}
                className={`mt-3 h-12 w-full rounded-[18px] border bg-white px-4 text-sm text-[#3B2928] outline-none transition placeholder:text-[#A0928F] focus:ring-4 ${
                  visibleError
                    ? 'border-[#D77474] focus:border-[#D77474] focus:ring-[#FFD4CE]/40'
                    : 'border-[#F0DDD8] focus:border-[#D77474] focus:ring-[#FFD4CE]/40'
                }`}
              />
              {visibleError && (
                <p id="workspace-name-error" className="mt-2 text-sm font-medium text-[#C96464]">
                  {visibleError}
                </p>
              )}
            </label>

            <div className="mt-7 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
                className="h-11 rounded-full border-[#F0DDD8] bg-white px-5 text-[#756967] hover:bg-[#FFF0EE] hover:text-[#3B2928]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!canSubmit}
                className="h-11 rounded-full bg-[#D77474] px-6 text-white shadow-[0_18px_40px_rgba(215,116,116,0.24)] hover:bg-[#C96464]"
              >
                {isSubmitting ? 'Creating...' : 'Create Workspace'}
              </Button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
