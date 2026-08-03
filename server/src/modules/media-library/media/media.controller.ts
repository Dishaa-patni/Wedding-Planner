
import { Types } from "mongoose";
import { ApiError } from "../../../utils/api-error.js";
import { ApiResponse } from "../../../utils/api-response.js";
import { asyncHandler } from "../../../utils/async-handler.js";
import { uploadBufferToCloudinary } from "../../../utils/upload-to-cloudinary.js";

import { MediaModel } from "./media.model.js";
import cloudinary from "../../../config/cloudinary.js";
import { getUserOrganization } from "../../../utils/helper.js";
import { requireUploadedFile, validateCollectionInOrganization } from "../media-library.helpers.js";


// 1) receive the request -> collectionID
// 2) Verify the user is authenicated JWT
//3) get the organization
//4) Check whether file was uploaded 
//5) with collectionId find the collection and validate it 
//6) Determine the media type from the uploaded file. If MIME type starts with video/ → video
// Otherwise → image

//7)Generate the Cloudinary folder path using the organization's ID.
//8)Upload the file buffer to cloudinary 
//9)Create a new Media document containing:
//10)Save the media document in MongoDB.

export const uploadMedia = asyncHandler(async(req,res)=>{

const {collectionId} = req.body
const userId = req.user?.id

const organization = await getUserOrganization(userId)

const file = requireUploadedFile(req.file)

const collection = await validateCollectionInOrganization(
    collectionId,
    organization._id
)

const mediaType = file.mimetype.startsWith('video/')? 'video' : 'image'

const cloudinaryResult = await uploadBufferToCloudinary(
    file.buffer,
    `vivaha/media-library/${organization._id}`,
)

const media = await MediaModel.create({
  organizationId: organization._id,
  collectionId: collection?._id ?? null,
  uploadedBy: userId,

  originalName: file.originalname,
  displayName: file.originalname,

  type: mediaType,
  mimeType: file.mimetype,
  size: file.size,

  url: cloudinaryResult.secure_url,
  cloudinaryPublicId: cloudinaryResult.public_id,
  cloudinaryResourceType: cloudinaryResult.resource_type,
})

const populatedMedia = await media.populate('uploadedBy', 'fullName email')

res.status(201).json(
    new ApiResponse(
        201,
        {media: populatedMedia},
        'Media Uploaded Successfully'
    )
)
})



// Get Media - either root level or inside collection 
// GET /api/media-library/media
// GET /api/media-library/media?collectionId=COLLECTION_ID
//1) Verify the user andget organization
//2) optional collection id in params 
//3) validate collection if provided 
//4) decide target collection id from collevtion _id
//5) find media in mdeia modek using collection id and organization id and sort them in decresing order
//6) return the response

export const getMedia = asyncHandler(async(req , res)=>{

    const userId = req.user?.id

    const organization = await getUserOrganization(userId)

    const {collectionId} = req.query

    const collection = await validateCollectionInOrganization(
        collectionId,
        organization._id
    )

    const page = Number(req.query.page)
    const limit = Number(req.query.limit)

    if (!Number.isInteger(page) || page < 1) {
  throw new ApiError(400, 'Page must be a positive number')
}

if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
  throw new ApiError(400, 'Limit must be between 1 and 50')
}

const filter = {
  organizationId: organization._id,
  ...(collection ? { collectionId: collection._id } : {}),
}

const totalItems = await MediaModel.countDocuments(filter)
const totalPages = Math.ceil(totalItems / limit)
const skip = (page - 1) * limit
    // if we get collection id then get the id from teh actual collection dont depend on collectionId from params 

    const media = await MediaModel.find(filter)
  .populate('uploadedBy', 'fullName email')
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit)

    res.status(200).json(
        new ApiResponse(
            200,
            {media ,
                meta:{
        page,
        limit,
        totalItems,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
                }
            },
            'Media Fetched Successfully'
        )
    )

})

// get single media by id GET /api/media-library/media/:mediaId
// verify logged in user , get organization 
// get media id from params validate it 
// get the media from mdeia model along with organization id to keep it separte 
// if media not found validte it to 404
// return the response media 

export const getMediaById = asyncHandler(async(req , res)=>{
    const userId = req.user?.id
    //route parameter
    const {mediaId} = req.params

  if (typeof mediaId !== 'string' || !Types.ObjectId.isValid(mediaId)) {
    throw new ApiError(400, 'Invalid media id')
  }
    const organization = await getUserOrganization(userId)

    const media = await MediaModel.findOne({
        _id: mediaId,
        organizationId: organization._id
    }).populate('uploadedBy', 'fullName email')

    if(!media){
        throw new ApiError(404 , 'Media not Found')
    }

    res.status(200).json(
        new ApiResponse(
            200,
            {media},
            'Media Fetched Successfully'
        )
    )
})


//patch update PATCH /api/media-library/media/:mediaId

//verify user , get organization
//validate mediaid from params 
//find media by id and organization id 
// if display name exist validate it upadte media.displayName
//cillectionId exist if null move media to root level update i 
//save media 
// return it 

export const updateMedia = asyncHandler(async(req , res)=>{

    const userId = req.user?.id
    const {mediaId} = req.params

      if (typeof mediaId !== 'string' || !Types.ObjectId.isValid(mediaId)) {
    throw new ApiError(400, 'Invalid media id')
  }

    const organization = await getUserOrganization(userId)

    const media = await MediaModel.findOne({
        _id: mediaId,
        organizationId: organization._id
    })


  if (!media) {
    throw new ApiError(404, 'Media not found')
  }

  const {displayName , collectionId} = req.body
   if (displayName !== undefined) {
    if (typeof displayName !== 'string' || !displayName.trim()) {
      throw new ApiError(400, 'Display name is required')
    }

    media.displayName = displayName.trim()
  }

//   In this request, user only wants to rename media.
// So backend should not touch media.collectionId.

   if ('collectionId' in req.body) {
    if (collectionId === null || collectionId === '') {
      media.collectionId = null
    } else {
      const collection = await validateCollectionInOrganization(
        collectionId,
        organization._id,
      )

      media.collectionId = collection?._id ?? null
    }
  }

  await media.save()

  const populatedMedia = await media.populate('uploadedBy', 'fullName email')

  res.status(200).json(
    new ApiResponse(
        200 ,
        {media: populatedMedia},
        'Media Updated Successfully'
    )
  )

})


// 1) Get mediaid from url , validate it 
//2) get user organization 
// 3) find media validate it 
// 4) Delete from cloudinary 
// delete from mongo db 
// return 

export const deleteMedia = asyncHandler(async(req , res)=>{

    const userId = req.user?.id
    const {mediaId} = req.params

    if (typeof mediaId !== 'string' || !Types.ObjectId.isValid(mediaId)) {
    throw new ApiError(400, 'Invalid media id')
  }

  const organization = await getUserOrganization(userId)

  const media = await MediaModel.findOne({
    _id: mediaId,
    organizationId: organization._id
  })

  if (!media) {
    throw new ApiError(404, 'Media not found')
  }

  await cloudinary.uploader.destroy(media.cloudinaryPublicId,{
        resource_type: media.cloudinaryResourceType as 'image' | 'video',
  })

  await media.deleteOne()

  res.status(200).json(
    new ApiResponse(
        200,
        {media},
        'Media deleted successfully'
    )
  )

})
