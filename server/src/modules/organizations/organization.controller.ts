import { ApiError } from '../../utils/api-error.js'
import { ApiResponse } from '../../utils/api-response.js'
import { asyncHandler } from '../../utils/async-handler.js'
import { OrganizationModel } from './organization.model.js'

export const createOrganization = asyncHandler(async (req, res) => {
  const { name, logoUrl } = req.body

  if (typeof name !== 'string' || !name.trim()) {
    throw new ApiError(400, 'Organization name is required')
  }

  const userId = req.user?.id

  if (!userId) {
    throw new ApiError(401, 'Unauthorized')
  }

  const existingOrganization = await OrganizationModel.findOne({
    ownerId: userId
  })

  if (existingOrganization) {
    throw new ApiError(409 , 'Organization already exists')
  }

  const organization = await OrganizationModel.create({
    name: name.trim(),
    logoUrl: typeof logoUrl === 'string' && logoUrl.trim() ? logoUrl.trim() : null,
    ownerId: userId
  })

 res.status(201).json(
    new ApiResponse(
        201,
        {organization},
        'Organization created successfully'
    )
 )
})

export const getCurrentOrganization = asyncHandler(async(req , res)=>{
    // getting the logged in user id from token 

    const userId = req.user?.id

    if(!userId){
            throw new ApiError(401, 'Unauthorized')
    }

    const organization = await OrganizationModel.findOne({
        ownerId: userId
    })

    if(!organization){
            throw new ApiError(404, 'Organization not found')
    }

    res.status(200).json(
        new ApiResponse(
            200,
           {
        user: {
          id: req.user?.id,
          fullName: req.user?.fullName,
          email: req.user?.email,
        },
        organization,
      },
            'Current organization fetched successfully',
        )
    )
})

