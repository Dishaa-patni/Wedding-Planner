'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FolderPlus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NewCollectionModalProps {
  open: boolean
  onClose: () => void
  onCreate: (name: string) => void
  existingCollectionNames?: string[]
  isCreating?: boolean
}

const validateCollectionName = (value: string, existingCollectionNames: string[]) => {
  const trimmedName = value.trim()

  if (!trimmedName) {
    return 'Collection name is required'
  }

  if (trimmedName.length < 2) {
    return 'Collection name must be at least 2 characters'
  }

  if (trimmedName.length > 80) {
    return 'Collection name cannot be more than 80 characters'
  }

  if (!/[a-zA-Z0-9]/.test(trimmedName)) {
    return 'Collection name must contain at least one letter or number'
  }

  const alreadyExists = existingCollectionNames.some(
    (collectionName) => collectionName.trim().toLowerCase() === trimmedName.toLowerCase(),
  )

  if (alreadyExists) {
    return 'A collection with this name already exists'
  }

  return ''
}

export function NewCollectionModal({
  open,
  onClose,
  onCreate,
  existingCollectionNames = [],
  isCreating = false,
}: NewCollectionModalProps) {
  const [name, setName] = useState('')
  const [hasInteracted, setHasInteracted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return

    setName('')
    setHasInteracted(false)
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 80)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  const handleSubmit = () => {
    const trimmedName = name.trim()
    const errorMessage = validateCollectionName(name, existingCollectionNames)

    if (errorMessage) {
      setHasInteracted(true)
      return
    }

    onCreate(trimmedName)
  }

  const handleClose = () => {
    if (isCreating) return

    setName('')
    setHasInteracted(false)
    onClose()
  }

  const validationError = validateCollectionName(name, existingCollectionNames)
  const visibleError = hasInteracted ? validationError : ''
  const canSubmit = !validationError

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
          <motion.div
            className="w-full max-w-[430px] rounded-[28px] border border-[#F0DDD8] bg-white p-6 shadow-[0_28px_80px_rgba(59,41,40,0.18)]"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-collection-title"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D77474] text-white shadow-[0_12px_28px_rgba(215,116,116,0.28)]">
                  <FolderPlus className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <div>
                  <h2 id="new-collection-title" className="font-display text-2xl text-[#3B2928]">
                    New Collection
                  </h2>
                  <p className="mt-1 text-sm leading-5 text-[#756967]">
                    Organize inspiration for a theme, occasion or wedding.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close new collection dialog"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#756967] transition hover:bg-[#FFF0EE] hover:text-[#3B2928]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <label className="mt-8 block">
              <span className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#8A7B78]">
                Collection Name
              </span>
              <input
                ref={inputRef}
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  setHasInteracted(true)
                }}
                onBlur={() => setHasInteracted(true)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') handleSubmit()
                }}
                placeholder="e.g. Royal Jaipur Palette"
                aria-invalid={Boolean(visibleError)}
                aria-describedby={visibleError ? 'collection-name-error' : undefined}
                className={`mt-3 h-12 w-full rounded-[18px] border bg-white px-4 text-sm text-[#3B2928] outline-none transition placeholder:text-[#A0928F] focus:ring-4 ${
                  visibleError
                    ? 'border-[#D77474] focus:border-[#D77474] focus:ring-[#FFD4CE]/50'
                    : 'border-[#F0DDD8] focus:border-[#D77474] focus:ring-[#FFD4CE]/40'
                }`}
              />
              {visibleError && (
                <p id="collection-name-error" className="mt-2 text-sm font-medium text-[#C96464]">
                  {visibleError}
                </p>
              )}
            </label>

            <div className="mt-7 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={handleClose}
                disabled={isCreating}
                className="h-11 rounded-full px-5 text-[#756967] hover:bg-[#FFF0EE] hover:text-[#3B2928]"
              >
                Cancel
              </Button>
              <Button
                type="button"
                disabled={!canSubmit || isCreating}
                onClick={handleSubmit}
                className="h-11 rounded-full bg-[#D77474] px-6 text-white shadow-[0_18px_40px_rgba(215,116,116,0.24)] hover:bg-[#C96464]"
              >
                {isCreating ? 'Creating...' : 'Create Collection'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
