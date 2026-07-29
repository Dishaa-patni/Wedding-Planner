import { Types } from "mongoose"
import { ApiError } from "../../utils/api-error.js"
import { OrganizationModel } from "../organizations/organization.model.js"
import { CollectionModel } from "./collections/collection.model.js"


export const getUserOrganization = async(userId? : string)=>{
if(!userId){
    throw new ApiError(401 , "Unauthorized")
}

const organization = await OrganizationModel.findOne({
    ownerId: userId
})

if(!organization){
    throw new ApiError(404 , "Organization not found")
}

return organization
}

export const validateCollectionInOrganization = async(
    collectionId: unknown,
    organizationId: Types.ObjectId
)=>{

    if(!collectionId){
        return null
    }

    if(typeof collectionId !== 'string' || !Types.ObjectId.isValid(collectionId)){
        throw new ApiError(400 , "Invalid Collection Id")
    }

    const collection = await CollectionModel.findOne({
        _id: collectionId,
        organizationId
    })

    if(!collection){
        throw new ApiError(404 , 'Collection not found ')
    }

    return collection
}

export const requireUploadedFile = (file?: Express.Multer.File) => {
  if (!file) {
    throw new ApiError(400, 'Media file is required')
  }

  return file
}