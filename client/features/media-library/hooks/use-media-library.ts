'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CreateCollectionRequest } from "../media-library.types"
import { mediaLibraryApi } from "../media-library.api"
import { appToast } from "@/components/ui/app-toaster"


// CReate a custom hook 
//return useMutation -> inside that add mutationFn 
//call the API function
// add success and error handling 

export const mediaLibraryQueryKeys = {
    collectionPages: (parentCollectionId?: string | null) =>
        ['media-library', 'collections', parentCollectionId ?? 'root'] as const,
    collections: (
  parentCollectionId?: string | null,
  page = 1,
  limit = 4,
) =>
  ['media-library', 'collections', parentCollectionId ?? 'root', page, limit] as const,
    collection: (collectionId: string) =>
        ['media-library', 'collection', collectionId] as const,
}

export const useCollections = (
  parentCollectionId?: string | null,
  page = 1,
  limit = 4,
) => {
  return useQuery({
    queryKey: mediaLibraryQueryKeys.collections(parentCollectionId, page, limit),
    queryFn: () =>
      mediaLibraryApi.getCollections({
        parentCollectionId: parentCollectionId ?? null,
        page,
        limit,
      }),
    select: (response) => response.data,
  })
}

export const useCollectionById = (collectionId: string) => {
    return useQuery({
        queryKey: mediaLibraryQueryKeys.collection(collectionId),
        queryFn: () => mediaLibraryApi.getCollectionById(collectionId),
        select: (response) => response.data,
    })
}

export const useCreateCollection =(parentCollectionId?: string | null)=>{
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: CreateCollectionRequest)=>
        mediaLibraryApi.createCollection(payload),

        onSuccess:(response)=>{
        queryClient.invalidateQueries({
            queryKey: mediaLibraryQueryKeys.collectionPages(parentCollectionId),
        })

        appToast.success({
        description: response.message,
         })
        } ,

        onError: (error: Error) => {
        appToast.error({
        description: error.message,
    })
 }, 
 })
}

export const useUpdateCollection = (parentCollectionId?: string | null) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      collectionId,
      name,
    }: {
      collectionId: string
      name: string
    }) => mediaLibraryApi.updateCollection(collectionId, { name }),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: mediaLibraryQueryKeys.collectionPages(parentCollectionId),
      })

      queryClient.invalidateQueries({
        queryKey: mediaLibraryQueryKeys.collection(response.data.collection._id),
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

export const useDeleteCollection = (parentCollectionId?: string | null) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn:(collectionId: string)=>
            mediaLibraryApi.deleteCollection(collectionId),

        onSuccess:(response)=>{
        queryClient.invalidateQueries({
            queryKey: mediaLibraryQueryKeys.collectionPages(parentCollectionId),

        })
        appToast.success({
        description: response.message,
      })
        },

        onError: (error: Error)=>{
         appToast.error({
            description: error.message
         })
        }
    })
}
