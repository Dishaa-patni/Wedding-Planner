'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FileImage, FolderPlus, ImagePlus, Upload, Video, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Collection } from '../media-library.types'

interface UploadMediaModalProps {
  open: boolean
  collections: Collection[]
  defaultCollectionId?: string | null
  isUploading?: boolean
  onClose: () => void
  onRequestCollection: () => void
  onUploadComplete: (
    files: File[],
    collectionId: string | null,
  ) => void
}

export function UploadMediaModal({
  open,
  collections,
  defaultCollectionId = null,
  isUploading = false,
  onClose,
  onRequestCollection,
  onUploadComplete,
}: UploadMediaModalProps) {
  const [files, setFiles] = useState<File[]>([])
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (sizeInBytes: number) => {
    if (sizeInBytes < 1024 * 1024) {
      return `${Math.max(1, Math.round(sizeInBytes / 1024))} KB`
    }

    return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const removeFile = (fileIndex: number) => {
    setFiles((currentFiles) =>
      currentFiles.filter((_, currentIndex) => currentIndex !== fileIndex),
    )
  }

  useEffect(() => {
    if (!open) return

    setFiles([])
    setSelectedCollectionId(defaultCollectionId)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isUploading) onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose, defaultCollectionId, isUploading])

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return
    setFiles(Array.from(fileList))
  }

  const handleUpload = () => {
    if (files.length === 0 || isUploading) return

    onUploadComplete(files, selectedCollectionId)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#3B2928]/28 px-4 backdrop-blur-[6px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => {
            if (!isUploading) onClose()
          }}
        >
          <motion.div
            className="w-full max-w-[440px] rounded-[28px] border border-[#F0DDD8] bg-white p-6 shadow-[0_28px_80px_rgba(59,41,40,0.18)]"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="upload-media-title"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D77474] text-white shadow-[0_12px_28px_rgba(215,116,116,0.28)]">
                  <ImagePlus className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <div>
                  <h2 id="upload-media-title" className="font-display text-2xl text-[#3B2928]">
                    Upload Media
                  </h2>
                  <p className="mt-1 text-sm leading-5 text-[#756967]">
                    Add images or videos to a collection.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!isUploading) onClose()
                }}
                aria-label="Close upload media dialog"
                disabled={isUploading}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#756967] transition hover:bg-[#FFF0EE] hover:text-[#3B2928] disabled:pointer-events-none disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-8">
              <span className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#8A7B78]">
                Add To Collection
              </span>

              <div className="mt-3 flex items-center gap-3">
                {collections.length > 0 ? (
                  <select
                    value={selectedCollectionId ?? ''}
                    onChange={(event) => setSelectedCollectionId(event.target.value || null)}
                    disabled={isUploading}
                    className="h-11 flex-1 rounded-[16px] border border-[#F0DDD8] bg-white px-4 text-sm text-[#3B2928] outline-none focus:border-[#D77474]"
                  >
                    <option value="">All Media</option>
                    {collections.map((collection) => (
                      <option key={collection._id} value={collection._id}>
                        {collection.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="flex-1 text-sm italic text-[#756967]">
                    No collections yet - save to All Media.
                  </p>
                )}

                <Button
                  type="button"
                  variant="outline"
                  onClick={onRequestCollection}
                  disabled={isUploading}
                  className="h-11 rounded-full border-[#F0DDD8] bg-white px-4 text-[#3B2928] hover:border-[#E8B9B3] hover:bg-[#FFF7F4]"
                >
                  <FolderPlus className="h-4 w-4" />
                  New
                </Button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault()
                if (isUploading) return
                addFiles(event.dataTransfer.files)
              }}
              disabled={isUploading}
              className="mt-5 flex min-h-[150px] w-full flex-col items-center justify-center rounded-[24px] border border-dashed border-[#EFCAC5] bg-[#FFF7F4] px-6 py-7 text-center transition hover:border-[#D77474] hover:bg-[#FFF0EE] disabled:pointer-events-none disabled:opacity-70"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#D77474] shadow-sm">
                <Upload className="h-5 w-5" />
              </span>
              <span className="mt-4 text-sm font-semibold text-[#3B2928]">
                {files.length > 0
                  ? files.length === 1
                    ? files[0].name
                    : `${files.length} files selected`
                  : 'Drop files here, or click to browse'}
              </span>
              <span className="mt-1 text-xs text-[#756967]">
                {files.length > 0
                  ? 'Ready to upload'
                  : 'Images and videos supported'}
              </span>
              <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                className="hidden"
                disabled={isUploading}
                onChange={(event) => addFiles(event.target.files)}
              />
            </button>

            {files.length > 0 && (
              <div className="mt-4 space-y-2 rounded-[18px] border border-[#F0DDD8] bg-[#FFF9F6] p-3">
                {files.map((file, index) => {
                  const isVideo = file.type.startsWith('video/')
                  const FileIcon = isVideo ? Video : FileImage

                  return (
                    <div
                      key={`${file.name}-${file.lastModified}`}
                      className="flex items-center gap-3 rounded-[14px] bg-white px-3 py-2 shadow-sm"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF0EE] text-[#D77474]">
                        <FileIcon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#3B2928]">
                          {file.name}
                        </p>
                        <p className="text-xs text-[#8A7B78]">
                          {isVideo ? 'Video' : 'Image'} - {formatFileSize(file.size)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        disabled={isUploading}
                        aria-label={`Remove ${file.name}`}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#756967] transition hover:bg-[#FFF0EE] hover:text-[#C96464] disabled:pointer-events-none disabled:opacity-50"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between gap-3">
              <p className="text-sm text-[#756967]">{files.length} files ready</p>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (!isUploading) onClose()
                  }}
                  disabled={isUploading}
                  className="h-11 rounded-full border-[#F0DDD8] bg-white px-5 text-[#756967] shadow-sm hover:border-[#E8B9B3] hover:bg-[#FFF7F4] hover:text-[#3B2928]"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  disabled={files.length === 0 || isUploading}
                  onClick={handleUpload}
                  className="h-11 rounded-full bg-[#D77474] px-6 text-white shadow-[0_18px_40px_rgba(215,116,116,0.24)] hover:bg-[#C96464]"
                >
                  {isUploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
