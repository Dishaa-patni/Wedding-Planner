'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Pencil, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface RenameCollectionModalProps {
  open: boolean
  collectionName: string
  existingCollectionNames: string[]
  onClose: () => void
  onRename: (name: string) => void
  isRenaming?: boolean
}

const validateCollectionName = (
  value: string,
  currentName: string,
  existingCollectionNames: string[],
) => {
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
    (name) =>
      name.trim().toLowerCase() !== currentName.trim().toLowerCase() &&
      name.trim().toLowerCase() === trimmedName.toLowerCase(),
  )

  if (alreadyExists) {
    return 'A collection with this name already exists'
  }

  return ''
}

export function RenameCollectionModal({
  open,
  collectionName,
  existingCollectionNames,
  onClose,
  onRename,
  isRenaming = false,
}: RenameCollectionModalProps) {
  const [name, setName] = useState(collectionName)
  const [hasInteracted, setHasInteracted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return

    setName(collectionName)
    setHasInteracted(false)
    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    }, 80)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isRenaming) onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [collectionName, isRenaming, onClose, open])

  const validationError = validateCollectionName(name, collectionName, existingCollectionNames)
  const visibleError = hasInteracted ? validationError : ''
  const hasChanged = name.trim() !== collectionName.trim()
  const canSubmit = !validationError && hasChanged

  const handleSubmit = () => {
    setHasInteracted(true)

    if (!canSubmit || isRenaming) return

    onRename(name.trim())
  }

  const handleClose = () => {
    if (isRenaming) return

    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#3B2928]/28 px-4 backdrop-blur-[6px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={handleClose}
        >
          <motion.div
            className="w-full max-w-[430px] rounded-[22px] border border-[#F0DDD8] bg-white p-7 shadow-[0_28px_80px_rgba(59,41,40,0.18)]"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="rename-collection-title"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF0EE] text-[#D77474]">
                  <Pencil className="h-4 w-4" />
                </div>
                <h2 id="rename-collection-title" className="font-display text-2xl text-[#3B2928]">
                  Rename Collection
                </h2>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close rename collection dialog"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#756967] transition hover:bg-[#FFF0EE] hover:text-[#3B2928]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <label className="mt-7 block">
              <span className="text-sm font-medium text-[#3B2928]">Collection Name</span>
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
                aria-invalid={Boolean(visibleError)}
                aria-describedby={visibleError ? 'rename-collection-error' : undefined}
                className={`mt-3 h-12 w-full rounded-[10px] border bg-white px-4 text-sm text-[#3B2928] outline-none transition placeholder:text-[#A0928F] focus:ring-4 ${
                  visibleError
                    ? 'border-[#D77474] focus:border-[#D77474] focus:ring-[#FFD4CE]/50'
                    : 'border-[#F0DDD8] focus:border-[#D77474] focus:ring-[#FFD4CE]/40'
                }`}
              />
              {visibleError && (
                <p id="rename-collection-error" className="mt-2 text-sm font-medium text-[#C96464]">
                  {visibleError}
                </p>
              )}
            </label>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isRenaming}
                className="h-12 rounded-[10px] border-[#F0DDD8] bg-white text-[#3B2928] hover:bg-[#FFF0EE]"
              >
                Cancel
              </Button>
              <Button
                type="button"
                disabled={!canSubmit || isRenaming}
                onClick={handleSubmit}
                className="h-12 rounded-[10px] bg-[#D77474] text-white shadow-[0_18px_40px_rgba(215,116,116,0.24)] hover:bg-[#C96464]"
              >
                {isRenaming ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
