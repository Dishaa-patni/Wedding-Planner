'use client'

import { toast } from '@/hooks/use-toast'
import { Toaster } from './toaster'

type AppToastOptions = {
  title: string
  description?: string
}

export const xxappToast = {
  success({ title, description }: AppToastOptions) {
    toast({
      title,
      description,
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
