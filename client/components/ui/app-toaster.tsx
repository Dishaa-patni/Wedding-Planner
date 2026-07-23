'use client'

import { toast } from '@/hooks/use-toast'
import { Toaster } from './toaster'

type AppToastOptions = {
  title: string
  description?: string
}

export const appToast = {
  success({ title, description }: AppToastOptions) {
    toast({
      title,
      description,
      className: 'border-[#86EFAC] bg-[#F0FDF4] text-[#14532D]',
    })
  },

  error({ title, description }: AppToastOptions) {
    toast({
      title,
      description,
      variant: 'destructive',
    })
  },
}

export function AppToaster() {
  return <Toaster viewportClassName="right-0 top-0" />
}
