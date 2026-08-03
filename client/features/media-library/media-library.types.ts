

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