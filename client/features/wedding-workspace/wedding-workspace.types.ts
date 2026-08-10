export type WeddingWorkspace = {
  _id: string
  name: string
  normalizedName: string
  organizationId: string
  createdBy: string
  status: 'active' | 'archived'
  createdAt: string
  updatedAt: string
}

export type CreateWeddingWorkspaceRequest = {
  name: string
}

export type CreateWeddingWorkspaceResponse = {
  success: boolean
  statusCode: number
  message: string
  data: {
    weddingWorkspace: WeddingWorkspace
  }
}

export type WeddingWorkspacePagination = {
  page: number
  limit: number
  totalItems: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export type GetWeddingWorkspacesResponse = {
  success: boolean
  statusCode: number
  message: string
  data: {
    weddingWorkspaces: WeddingWorkspace[]
    meta: WeddingWorkspacePagination
  }
}

export type GetWeddingWorkspaceResponse = {
  success: boolean
  statusCode: number
  message: string
  data: {
    weddingWorkspace: WeddingWorkspace
  }
}

export type MoodboardSection = {
  _id: string
  name: string
  normalizedName: string
  organizationId: string
  weddingWorkspaceId: string
  isDefault: boolean
  position: number
  createdBy: string
  createdAt: string
  updatedAt: string
}

export type GetMoodboardSectionsResponse = {
  success: boolean
  statusCode: number
  message: string
  data: {
    moodboardSections: MoodboardSection[]
  }
}
