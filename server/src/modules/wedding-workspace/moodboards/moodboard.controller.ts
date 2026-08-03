import { Types } from "mongoose";
import { ApiError } from "../../../utils/api-error.js";
import { ApiResponse } from "../../../utils/api-response.js";
import { asyncHandler } from "../../../utils/async-handler.js";
import { getUserOrganization } from "../../../utils/helper.js";
import { WeddingWorkspaceModel } from "../wedding-workspace.model.js";
import { MoodBoardSectionModel } from "./moodboard-section.model.js";




export const createMoodboardSections = asyncHandler(async(req , res)=>{

    const {name} = req.body
    const {weddingId} = req.params

     if (typeof weddingId !== 'string' || !Types.ObjectId.isValid(weddingId)) {
    throw new ApiError(400, 'Invalid wedding workspace id')
  }

  if (typeof name !== 'string' || !name.trim()) {
    throw new ApiError(400, 'Section name is required')
  }

  if (name.trim().length > 80) {
    throw new ApiError(400, 'Section name must be 80 characters or less')
  }

const organization = await getUserOrganization(req.user?.id)

//find wedding workspace 

const weddingWorkspace = await WeddingWorkspaceModel.findOne({
    _id: weddingId,
    organizationId: organization._id
})

if(!weddingWorkspace){
    throw new ApiError(404 , "Wedding Workspace not found")
}

  const normalizedName = name.trim().toLowerCase()

  const existingSection = await MoodBoardSectionModel.findOne({
    organizationId: organization._id,
    weddingWorkspaceId: weddingWorkspace._id,
    normalizedName,
  })

  if (existingSection) {
    throw new ApiError(409, 'Moodboard section already exists')
  }
    const lastSection = await MoodBoardSectionModel.findOne({
    organizationId: organization._id,
    weddingWorkspaceId: weddingWorkspace._id,
  }).sort({ position: -1 })

  const nextPosition = lastSection ? lastSection.position + 1 : 0

  const moodboardSection = await MoodBoardSectionModel.create({
    name: name.trim(),
    normalizedName,
    organizationId: organization._id,
    weddingWorkspaceId: weddingWorkspace._id,
     isDefault: false,
    position: nextPosition,
    createdBy: req.user?.id,
  })

  res.status(201).json(
    new ApiResponse(
        201,
        {moodboardSection},
        'Moodboard section is created'
    )
  )

})

export const getMoodboardSections = asyncHandler(async(req ,res)=>{
    const organization = await getUserOrganization(req.user?.id)

    const {weddingId} = req.params

    if (typeof weddingId !== 'string' || !Types.ObjectId.isValid(weddingId)) {
    throw new ApiError(400, 'Invalid wedding workspace id')
  }

  //finding wedding workspace

  const weddingWorkspace = await WeddingWorkspaceModel.findOne({
    _id: weddingId,
    organizationId: organization._id
  })

  if(!weddingWorkspace){
    throw new ApiError(404 , "Wedding Workspace not found")
}

const moodboardSections = await MoodBoardSectionModel.find({
    organizationId: organization._id,
    weddingWorkspaceId: weddingWorkspace._id
}).sort({ position: 1 })

res.status(200).json(
    new ApiResponse(
        200,
        {moodboardSections},
        'Moodboard sections fetched successfully'
    )
)
})