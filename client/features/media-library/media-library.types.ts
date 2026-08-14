

export type CreateCollectionRequest = {
    name: string
    parentCollectionId: string | null
}
export type Pagination = {
  page: number
  limit: number
  totalItems: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export type Collection = {
  _id: string
  name: string
  normalizedName: string
  organizationId: string
  parentCollectionId: string | null
  createdBy: string
  createdAt: string
  updatedAt: string
}

export type CreateCollectionResponse = {
  success: boolean  
  statusCode: number
  message: string
  data: {
    collection: Collection
  }
}

export type GetCollectionsResponse = {
  success: boolean
  statusCode: number
  message: string
  data: {
    collections: Collection[]
    meta: Pagination
  }
}

export type CollectionBreadcrumb = {
  id: string
  name: string
}

export type GetCollectionByIdResponse = {
  success: boolean
  statusCode: number
  message: string
  data: {
    collection: Collection
    breadcrumbs: CollectionBreadcrumb[]
  }
}


export type RenameCollectionRequest = {
  name: string
}

export type RenameCollectionResponse = {
  success: boolean
  statusCode: number
  message: string
  data: {
    collection: Collection
  }
}

export type DeleteCollectionResponse = {
  success: boolean
  statusCode: number
  message: string
  data: {
    deletedCount: number
    deletedCollectionIds: string[]
  }
}

export type UploadedBy = {
  _id: string
  fullName: string
  email: string
}

export type MediaCollectionReference = {
  _id: string
  name: string
}

export type MediaLibraryItem = {
  _id: string
  organizationId: string
  collectionId: string | MediaCollectionReference | null
  url: string
  cloudinaryPublicId: string
  cloudinaryResourceType: string
  type: 'image' | 'video'
  size: number
  mimeType: string
  uploadedBy: string | UploadedBy
  originalName: string
  displayName: string
  createdAt: string
  updatedAt: string
}

export type UploadMediaResponse = {
  success: boolean
  statusCode: number
  message: string
  data: {
    media: MediaLibraryItem
  }
}

export type DeleteMediaResponse = {
  success: boolean
  statusCode: number
  message: string
  data: {
    media: MediaLibraryItem
  }
}

export type GetMediaResponse = {
  success: boolean
  statusCode: number
  message: string
  data: {
    media: MediaLibraryItem[]
    meta: Pagination
  }
}

export type AddMoodboardItemRequest = {
  mediaId: string
  note?: string
  sectionId?: string
}

export type MoodboardSectionReference = {
  _id: string
  name: string
  isDefault: boolean
  position: number
}

export type MoodboardItem = {
  _id: string
  organizationId: string
  weddingWorkspaceId: string
  sectionId: string | MoodboardSectionReference
  mediaId: string | MediaLibraryItem
  note: string
  addedBy: string | UploadedBy
  position: number
  createdAt: string
  updatedAt: string
}

export type AddMoodboardItemResponse = {
  success: boolean
  statusCode: number
  message: string
  data: {
    moodboardItem: MoodboardItem
  }
}
