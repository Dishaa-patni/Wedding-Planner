import { apiClient } from '@/services'
import type {
  CreateWeddingWorkspaceRequest,
  CreateWeddingWorkspaceResponse,
  GetMoodboardSectionsResponse,
  GetWeddingWorkspaceResponse,
  GetWeddingWorkspacesResponse,
} from './wedding-workspace.types'

type GetWeddingWorkspacesParams = {
  page?: number
  limit?: number
  status?: 'active' | 'archived'
}

const createWeddingWorkspace = (payload: CreateWeddingWorkspaceRequest) =>
  apiClient.post<CreateWeddingWorkspaceResponse, CreateWeddingWorkspaceRequest>(
    '/api/v1/wedding-workspaces',
    payload,
  )

const getWeddingWorkspaces = ({
  page = 1,
  limit = 9,
  status,
}: GetWeddingWorkspacesParams = {}) =>
  apiClient.get<GetWeddingWorkspacesResponse>('/api/v1/wedding-workspaces', {
    params: {
      page,
      limit,
      ...(status ? { status } : {}),
    },
  })

const getWeddingWorkspace = (weddingId: string) =>
  apiClient.get<GetWeddingWorkspaceResponse>(`/api/v1/wedding-workspaces/${weddingId}`)

const getMoodboardSections = (weddingId: string) =>
  apiClient.get<GetMoodboardSectionsResponse>(
    `/api/v1/wedding-workspaces/${weddingId}/moodboard/sections`,
  )

export const weddingWorkspaceApi = {
  createWeddingWorkspace,
  getMoodboardSections,
  getWeddingWorkspace,
  getWeddingWorkspaces,
}
