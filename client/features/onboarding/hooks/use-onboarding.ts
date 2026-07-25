'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { appToast } from '@/components/ui/app-toaster'
import { onboardingApi } from '../api/onboarding.api'
import { CreateOrganizationRequest } from '../onboarding.types'

export const useCreateOrganization = () =>
  useMutation({
    mutationFn: (payload: CreateOrganizationRequest) =>
      onboardingApi.createOrganization(payload),
    onSuccess: (response) => {
      appToast.success({
        title: 'Organization created',
        description: response.message,
      })
    },
    onError: (error: Error) => {
      appToast.error({
        title: 'Organization setup failed',
        description: error.message,
      })
    },
  })

  export const useCurrentOrganization = () =>
  useQuery({
    queryKey: ['current-organization'],
    queryFn: onboardingApi.getCurrentOrganization,
    select: (response) => response.data,
    retry: false,
  })
