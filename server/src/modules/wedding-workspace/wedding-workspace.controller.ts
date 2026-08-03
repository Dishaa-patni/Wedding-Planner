import { Types } from "mongoose";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { getUserOrganization } from "../../utils/helper.js";
import { WeddingWorkspaceModel } from "./wedding-workspace.model.js";


export const createWeddingWorkspace = asyncHandler(async(req , res)=>{
// get the name from body 

const {name} = req.body

//get logged  in user 

const userId = req.user?.id
const organization = await getUserOrganization(userId)

//normalize the name and validat existing weddingworkspace
const normalizedName = name.trim().toLowerCase()

const existingWedding = await WeddingWorkspaceModel.findOne({
    organizationId: organization._id,
    normalizedName
})

  if (existingWedding) {
    throw new ApiError(409, 'Wedding workspace already exists')
  }

  const weddingWorkspace = await WeddingWorkspaceModel.create({
    name: name.trim(),
    normalizedName,
    organizationId: organization._id,
    createdBy: userId
  })

  res.status(201).json(
    new ApiResponse(
        201,
        {weddingWorkspace},
        'Wedding Workspace Created Successfully'
    )
  )
})

export const getWeddingWorspaces = asyncHandler(async(req , res)=>{
// authenticate user
const organization = await getUserOrganization(req.user?.id)

// page and limt 
const page = Number(req.query.page ?? 1)
const limit = Number(req.query.limit ?? 10)

  if (!Number.isInteger(page) || page < 1) {
    throw new ApiError(400, 'Page must be a positive number')
  }

  if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
    throw new ApiError(400, 'Limit must be between 1 and 50')
  }
 const {status} = req.query
    if (
    status !== undefined &&
    status !== 'active' &&
    status !== 'archived'
  ) {
    throw new ApiError(400, 'Invalid wedding workspace status')
  }

  const filter = {
    organizationId: organization._id,
    ...(status === 'active' || status ==='archived' ? {status}: {})
  }

// total items total pages and how many to skip 

const totalItems = await WeddingWorkspaceModel.countDocuments(filter)

const totalPages = Math.ceil(totalItems / limit)

const skip = (page - 1) * limit

const weddingWorkspaces = await WeddingWorkspaceModel.find(filter)
.sort({createdAt: -1})
.skip(skip)
.limit(limit)

res.status(200).json(
    new ApiResponse(
        200 ,
        {weddingWorkspaces ,
            meta:{
                page,
                limit,
                totalItems,
                totalPages,
                hasPreviousPage: page>1,
                hasNextPage : page < totalPages
            }
        },
        'Wedding Workspaces Fetched Successfully'
    )
)

})

export const getWeddingWorspaceById = asyncHandler(async(req , res)=>{

    const {weddingId} = req.params

    if (typeof weddingId !== 'string' || !Types.ObjectId.isValid(weddingId)) {
    throw new ApiError(400, 'Invalid wedding workspace id')
  }
    const organization = await getUserOrganization(req.user?.id)

    const weddingWorkspace = await WeddingWorkspaceModel.findOne({
        _id: weddingId,
        organizationId: organization._id
    })

     if (!weddingWorkspace) {
    throw new ApiError(404, 'Wedding workspace not found')
  }

  res.status(200).json(
    new ApiResponse(
        200,
        {weddingWorkspace},
        'Wedding Workspace Fetched Successfully'
    )
  )

})

export const updateWeddingWorkspace = asyncHandler(async(req , res)=>{
    const organization = await getUserOrganization(req.user?.id)

    const {weddingId} = req.params

    const {name , status: weddingStatus} = req.body
    
     if (typeof weddingId !== 'string' || !Types.ObjectId.isValid(weddingId)) {
    throw new ApiError(400, 'Invalid wedding workspace id')
  }

  // find wedding in organization
  const weddingWorkspace = await WeddingWorkspaceModel.findOne({
    _id: weddingId,
    organizationId: organization._id
  })

   if (!weddingWorkspace) {
    throw new ApiError(404, 'Wedding workspace not found')
  }

  if(name !== undefined){
     if (typeof name !== 'string' || !name.trim()) {
      throw new ApiError(400, 'Wedding name is required')
    }

    if (name.trim().length > 100) {
      throw new ApiError(400, 'Wedding name must be 100 characters or less')
    }

    const normalizedName = name.trim().toLowerCase()

      const duplicateWedding = await WeddingWorkspaceModel.findOne({
      _id: { $ne: weddingWorkspace._id },
      organizationId: organization._id,
      normalizedName,
    })

    if (duplicateWedding) {
      throw new ApiError(409, 'Wedding workspace already exists')
    }
    
    weddingWorkspace.name = name.trim()
    weddingWorkspace.normalizedName = normalizedName

  }

   if (weddingStatus !== undefined) {
    if (weddingStatus !== 'active' && weddingStatus !== 'archived') {
      throw new ApiError(400, 'Invalid wedding workspace status')
    }

    weddingWorkspace.status = weddingStatus
  }

  await weddingWorkspace.save()

  res.status(200).json(
    new ApiResponse(
        200,
        {weddingWorkspace},
        'Wedding Workspace Updated Successfully'
    )
  )

})