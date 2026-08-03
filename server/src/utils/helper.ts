
import { ApiError } from "./api-error.js"
import { OrganizationModel } from "../modules/organizations/organization.model.js"


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

