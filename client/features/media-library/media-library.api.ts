import { apiClient } from "@/services";
import type {
  CreateCollectionRequest,
  CreateCollectionResponse,
  DeleteCollectionResponse,
  GetCollectionByIdResponse,
  GetCollectionsResponse,
  RenameCollectionRequest,
  RenameCollectionResponse,
} from "./media-library.types";

type GetCollectionsParams = {
  parentCollectionId?: string | null
  page?: number
  limit?: number
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

export const mediaLibraryApi = {
  createCollection,
  getCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
}
