'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { appToast } from '@/components/ui/app-toaster'
import type { CreateWeddingWorkspaceRequest } from './wedding-workspace.types'
import { weddingWorkspaceApi } from './wedding-workspace.api'

export const weddingWorkspaceQueryKeys = {
  all: ['wedding-workspaces'] as const,
  lists: () => [...weddingWorkspaceQueryKeys.all, 'list'] as const,
  list: (page = 1, limit = 9, status?: 'active' | 'archived') =>
    [...weddingWorkspaceQueryKeys.lists(), page, limit, status ?? 'all'] as const,
  details: () => [...weddingWorkspaceQueryKeys.all, 'detail'] as const,
  detail: (weddingId: string) => [...weddingWorkspaceQueryKeys.details(), weddingId] as const,
  moodboardSections: (weddingId: string) =>
    [...weddingWorkspaceQueryKeys.detail(weddingId), 'moodboard-sections'] as const,
}

export const useWeddingWorkspaces = (
  page = 1,
  limit = 9,
  status?: 'active' | 'archived',
) => {
  return useQuery({
    queryKey: weddingWorkspaceQueryKeys.list(page, limit, status),
    queryFn: () =>
      weddingWorkspaceApi.getWeddingWorkspaces({
        page,
        limit,
        status,
      }),
    select: (response) => response.data,
  })
}

export const useWeddingWorkspace = (weddingId: string) => {
  return useQuery({
    queryKey: weddingWorkspaceQueryKeys.detail(weddingId),
    queryFn: () => weddingWorkspaceApi.getWeddingWorkspace(weddingId),
    enabled: Boolean(weddingId),
    select: (response) => response.data.weddingWorkspace,
  })
}

export const useMoodboardSections = (weddingId: string) => {
  return useQuery({
    queryKey: weddingWorkspaceQueryKeys.moodboardSections(weddingId),
    queryFn: () => weddingWorkspaceApi.getMoodboardSections(weddingId),
    enabled: Boolean(weddingId),
    select: (response) => response.data.moodboardSections,
  })
}

export const useCreateWeddingWorkspace = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateWeddingWorkspaceRequest) =>
      weddingWorkspaceApi.createWeddingWorkspace(payload),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: weddingWorkspaceQueryKeys.lists(),
      })

      appToast.success({
        description: response.message,
      })
    },

    onError: (error: Error) => {
      appToast.error({
        description: error.message,
      })
    },
  })
}
