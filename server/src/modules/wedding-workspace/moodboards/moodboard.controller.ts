import { Types } from "mongoose";
import { ApiError } from "../../../utils/api-error.js";
import { ApiResponse } from "../../../utils/api-response.js";
import { asyncHandler } from "../../../utils/async-handler.js";
import { getUserOrganization } from "../../../utils/helper.js";
import { WeddingWorkspaceModel } from "../wedding-workspace.model.js";
import { MoodBoardSectionModel } from "./moodboard-section.model.js";
import { MediaModel } from "../../media-library/media/media.model.js";
import { MoodboardItemModel } from "./moodboard-item.model.js";




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

export const addMoodboardItem = asyncHandler(async(req , res)=>{
const {weddingId} = req.params
const {mediaId , note , sectionId} = req.body

const organization = await getUserOrganization(req.user?.id)

if (typeof weddingId !== 'string' || !Types.ObjectId.isValid(weddingId)) {
  throw new ApiError(400, 'Invalid wedding workspace id')
}

if (typeof mediaId !== 'string' || !Types.ObjectId.isValid(mediaId)) {
  throw new ApiError(400, 'Invalid media id')
}

//finding wedding workspace 
const weddingWorkspace = await WeddingWorkspaceModel.findOne({
    _id: weddingId,
    organizationId: organization._id
})

if(!weddingWorkspace){
    throw new ApiError(404 , 'Wedding workspace not found')
}

//find the media 

const media = await MediaModel.findOne({
    _id: mediaId,
    organizationId: organization._id
})

if (!media) {
  throw new ApiError(404, 'Media not found')
}

//if frontend sends section id 
let targetSection = null

if(sectionId){
    if(typeof sectionId !== 'string' || !Types.ObjectId.isValid(sectionId)){
        throw new ApiError(400 , 'Invalid moodboard section id')
    }

    targetSection = await MoodBoardSectionModel.findOne({
        _id: sectionId,
        organizationId: organization._id,
        weddingWorkspaceId: weddingWorkspace._id
    })

    
  if (!targetSection) {
    throw new ApiError(404, 'Moodboard section not found')
  }
}

//no sectionid use default section client 

if(!targetSection){
    targetSection = await MoodBoardSectionModel.findOne({
        organizationId: organization._id,
        weddingWorkspaceId: weddingWorkspace._id,
        isDefault: true
    })

      if (!targetSection) {
    throw new ApiError(404, 'Default moodboard section not found')
  }
}

//validate the note 

const cleanNote = typeof note === 'string' ? note.trim() : ''

if (note !== undefined && typeof note !== 'string') {
  throw new ApiError(400, 'Note must be a string')
}

if (cleanNote.length > 1000) {
  throw new ApiError(400, 'Note must be 1000 characters or less')
}

//preventing duplicate item 

const existingItem = await MoodboardItemModel.findOne({
organizationId: organization._id,
weddingWorkspaceId: weddingWorkspace._id,
sectionId: targetSection._id,
mediaId: media._id
})

if(existingItem){
    throw new ApiError(409, 'Media already exists in this moodboard section')
}

//calculate position This keeps items ordered inside the section.
const lastItem = await MoodboardItemModel.findOne({
  organizationId: organization._id,
  weddingWorkspaceId: weddingWorkspace._id,
  sectionId: targetSection._id,
}).sort({ position: -1 })

const nextPosition = lastItem ? lastItem.position + 1 : 0

// create moodboard item 

const moodboardItem = await MoodboardItemModel.create({
  organizationId: organization._id,
  weddingWorkspaceId: weddingWorkspace._id,
  sectionId: targetSection._id,
  mediaId: media._id,
  note: cleanNote,
  addedBy: req.user?.id,
  position: nextPosition,
})

//populate responses 
const populatedMoodboardItem = await moodboardItem.populate([
  {
    path: 'mediaId',
    select: 'displayName type url mimeType collectionId',
    populate: {
      path: 'collectionId',
      select: 'name',
    },
  },
  {
    path: 'sectionId',
    select: 'name isDefault position',
  },
  {
    path: 'addedBy',
    select: 'fullName email',
  },
])

res.status(201).json(
    new ApiResponse(
        201,
        {moodboardItem: populatedMoodboardItem},
         'Media added to moodboard successfully',

    )
)

})