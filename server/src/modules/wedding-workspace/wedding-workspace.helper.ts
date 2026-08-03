import { ApiError } from "../../utils/api-error.js"

export const validateWeddingName = async(name: string)=>{
  if (typeof name !== 'string' || !name.trim()) {
    throw new ApiError(400, 'Wedding name is required')
  }

  if (name.trim().length > 100) {
    throw new ApiError(400, 'Wedding name must be 100 characters or less')
  }

}

