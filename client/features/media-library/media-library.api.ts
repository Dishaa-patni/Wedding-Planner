import { apiClient } from "@/services";
import type {
  AddMoodboardItemRequest,
  AddMoodboardItemResponse,
  CreateCollectionRequest,
  CreateCollectionResponse,
  DeleteCollectionResponse,
  DeleteMediaResponse,
  GetCollectionByIdResponse,
  GetCollectionsResponse,
  GetMediaResponse,
  RenameCollectionRequest,
  RenameCollectionResponse,
  UploadMediaResponse,
} from "./media-library.types";

type GetCollectionsParams = {
  parentCollectionId?: string | null
  page?: number
  limit?: number
}

type GetMediaParams = {
  collectionId?: string | null
  page?: number
  limit?: number
}

type UploadMediaPayload = {
  file: File
  collectionId?: string | null
}

type AddMoodboardItemPayload = AddMoodboardItemRequest & {
  weddingId: string
}

const createCollection = (
  payload: CreateCollectionRequest,
) =>
  apiClient.post<CreateCollectionResponse,CreateCollectionRequest>(
    '/api/v1/media-library/collections',
    payload,
  )

const getCollections = ({parentCollectionId=null, page=1 , limit=4} : GetCollectionsParams) =>
  apiClient.get<GetCollectionsResponse>(
    '/api/v1/media-library/collections',
    {
      params: {
        ...(parentCollectionId ? { parentCollectionId } : {}),
        page,
        limit   
    },
    },
  )

const getCollectionById = (collectionId: string) =>
  apiClient.get<GetCollectionByIdResponse>(
    `/api/v1/media-library/collections/${collectionId}`,
  )

const updateCollection = (collectionId: string, payload: RenameCollectionRequest) =>
  apiClient.patch<RenameCollectionResponse, RenameCollectionRequest>(
    `/api/v1/media-library/collections/${collectionId}`,
    payload,
  )

const deleteCollection = (collectionId: string) =>
  apiClient.del<DeleteCollectionResponse>(
    `/api/v1/media-library/collections/${collectionId}`,
  )

const getMedia = ({ collectionId = null, page = 1, limit = 20 }: GetMediaParams) =>
  apiClient.get<GetMediaResponse>('/api/v1/media-library/media', {
    params: {
      ...(collectionId ? { collectionId } : {}),
      page,
      limit,
    },
  })

const uploadMedia = ({ file, collectionId = null }: UploadMediaPayload) => {
  const formData = new FormData()
  formData.append('file', file)

  if (collectionId) {
    formData.append('collectionId', collectionId)
  }

  return apiClient.post<UploadMediaResponse, FormData>(
    '/api/v1/media-library/media',
    formData,
  )
}

const deleteMedia = (mediaId: string) =>
  apiClient.del<DeleteMediaResponse>(
    `/api/v1/media-library/media/${mediaId}`,
  )

const addMoodboardItem = ({
  weddingId,
  mediaId,
  note,
  sectionId,
}: AddMoodboardItemPayload) =>
  apiClient.post<AddMoodboardItemResponse, AddMoodboardItemRequest>(
    `/api/v1/wedding-workspaces/${weddingId}/moodboard/items`,
    {
      mediaId,
      ...(note ? { note } : {}),
      ...(sectionId ? { sectionId } : {}),
    },
  )

export const mediaLibraryApi = {
  createCollection,
  getCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
  getMedia,
  uploadMedia,
  deleteMedia,
  addMoodboardItem,
}
