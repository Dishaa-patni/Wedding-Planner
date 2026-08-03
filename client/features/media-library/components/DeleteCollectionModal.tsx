'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DeleteCollectionModalProps {
  open: boolean
  collectionName: string
  imageCount: number
  videoCount: number
  onClose: () => void
  onDelete: () => void
  isDeleting?: boolean
}

export function DeleteCollectionModal({
  open,
  collectionName,
  imageCount,
  videoCount,
  onClose,
  onDelete,
  isDeleting = false,
}: DeleteCollectionModalProps) {
  const handleClose = () => {
    if (isDeleting) return

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
            className="w-full max-w-[500px] rounded-[22px] border border-[#F0DDD8] bg-white p-7 text-center shadow-[0_28px_80px_rgba(59,41,40,0.18)]"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-collection-title"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close delete collection dialog"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-[#756967] transition hover:bg-[#FFF0EE] hover:text-[#3B2928]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF0EE] text-[#C96464]">
              <Trash2 className="h-7 w-7" strokeWidth={2.1} />
            </div>

            <h2 id="delete-collection-title" className="mt-5 font-display text-2xl text-[#3B2928]">
              Delete Collection?
            </h2>
            <p className="mx-auto mt-3 max-w-[360px] text-sm leading-6 text-[#756967]">
              This collection contains {imageCount} images and {videoCount} videos. Deleting{' '}
              <span className="font-semibold text-[#3B2928]">{collectionName}</span> will also
              remove all media inside.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isDeleting}
                className="h-12 rounded-[10px] border-[#F0DDD8] bg-white text-[#3B2928] hover:bg-[#FFF0EE]"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={onDelete}
                disabled={isDeleting}
                className="h-12 rounded-[10px] bg-[#D77474] text-white shadow-[0_18px_40px_rgba(215,116,116,0.24)] hover:bg-[#C96464]"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
