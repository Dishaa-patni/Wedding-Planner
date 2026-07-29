import { Types } from "mongoose";
import { ApiError } from "../../../utils/api-error.js";
import { asyncHandler } from "../../../utils/async-handler.js";
import { OrganizationModel } from "../../organizations/organization.model.js";
import { CollectionModel } from "./collection.model.js";
import { ApiResponse } from "../../../utils/api-response.js";

export const createCollection = asyncHandler(async (req, res) => {
  //getting data send by frontend

  const { name, parentCollectionId } = req.body;

  // Validates the collection name
  if (typeof name != "string" || !name.trim()) {
    throw new ApiError(400, "Collection Name is required");
  }

  //find the logged in user -> auth middleware

  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  // finding the user organization

  // TypeScript is saying organization is still a Query, not the actual organization document.
  // const organization = OrganizationModel.findOne({
  //  ownerId : userId
  // })

  const organization = await OrganizationModel.findOne({
    ownerId: userId,
  });

  if (!organization) {
    throw new ApiError(404, "Organization not found ");
  }

  // by default for root level
  let parentId = null;

  //did the user has parent root
  if (parentCollectionId) {
    //validate the parent
    if (!Types.ObjectId.isValid(parentCollectionId)) {
      throw new ApiError(400, "Invalid parent collection id");
    }

    const parentCollection = await CollectionModel.findOne({
      _id: parentCollectionId,
      organizationId: organization._id,
    });
    if (!parentCollection) {
      throw new ApiError(404, "Parent collection not found");
    }

    parentId = parentCollection._id;
  }

  // Clean the collection name
  const trimmedName = name.trim();

  const normalizedName = trimmedName.toLowerCase();

  //check for duplicate collection name
  const existingCollection = await CollectionModel.findOne({
    organizationId: organization._id,
    parentCollectionId: parentId,
    normalizedName,
  });

  if (existingCollection) {
    throw new ApiError(409, "The Collection Already exist");
  }

  // Creating the collection in the mongo db
  const collection = await CollectionModel.create({
    name: trimmedName,
    normalizedName,
    organizationId: organization._id,
    parentCollectionId: parentId,
    createdBy: userId,
  });

  // Return success

  res
    .status(201)
    .json(
      new ApiResponse(201, { collection }, "Collection created successfully"),
    );
});

export const getCollection = asyncHandler(async (req, res) => {
  // the logged in user

  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  // find the organization

  const organization = await OrganizationModel.findOne({
    ownerId: userId,
  });

  if (!organization) {
    throw new ApiError(404, " Organization not found ");
  }

  // read the parent colection id from url query
  const { parentCollectionId } = req.query;

  let parentId = null;

  if (typeof parentCollectionId === "string" && parentCollectionId) {
    if (!Types.ObjectId.isValid(parentCollectionId)) {
      throw new ApiError(400, "Invalid parent collection id");
    }
    const parentCollection = await CollectionModel.findOne({
      _id: parentCollectionId,
      organizationId: organization._id,
    });

    if (!parentCollection) {
      throw new ApiError(404, "Parent collection not found");
    }

    parentId = parentCollection._id;
  }

  const collections = await CollectionModel.find({
    organizationId: organization._id,
    parentCollectionId: parentId,
  }).sort({
    createdAt: -1,
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { collections },
        "Collections fetched successfully",
      ),
    );
});


// collection by and breadcrums 

export const getCollectionByID = asyncHandler(async(req , res)=>{
// getting collection id from params 

const {collectionId} = req.params

// authenticate the user

const userId = req.user?.id

if(!userId){
  throw new ApiError(401 , 'Unauthorized')
}

//Validate teh collection ID 
if(typeof collectionId !== 'string' || !Types.ObjectId.isValid(collectionId)){
  throw new ApiError(400 , 'Invalid Collection Id')
}

// find the user organization

const organization = await OrganizationModel.findOne({
  ownerId: userId
})
if (!organization) {
  throw new ApiError(404, 'Organization not found')
}

// find the requested collection safely 
const collection = await CollectionModel.findOne({
_id: collectionId,
organizationId: organization._id
})

if (!collection) {
  throw new ApiError(404, 'Collection not found')
}


const breadcrumbs: Array<{
  id: Types.ObjectId
  name: string
}> = []

 let currentCollection: typeof collection | null = collection

  while (currentCollection) {
    breadcrumbs.unshift({
      id: currentCollection._id,
      name: currentCollection.name,
    })

    if (!currentCollection.parentCollectionId) {
      break
    }

    currentCollection = await CollectionModel.findOne({
      _id: currentCollection.parentCollectionId,
      organizationId: organization._id,
    })
  }

  res.status(200).json(
    new ApiResponse(
      200,
      {
        collection,
        breadcrumbs
      },
      'Collection Fetched Successfully '
    )
  )
})

export const updateCollectionName = asyncHandler(async (req, res) => {
  const { collectionId } = req.params
  const { name } = req.body

  if (typeof collectionId !== 'string' || !Types.ObjectId.isValid(collectionId)) {
    throw new ApiError(400, 'Invalid Collection Id')
  }

  if (typeof name !== 'string' || !name.trim()) {
    throw new ApiError(400, 'Collection Name is required')
  }

  const userId = req.user?.id

  if (!userId) {
    throw new ApiError(401, 'Unauthorized')
  }

  const organization = await OrganizationModel.findOne({
    ownerId: userId,
  })

  if (!organization) {
    throw new ApiError(404, 'Organization not found')
  }

  const collection = await CollectionModel.findOne({
    _id: collectionId,
    organizationId: organization._id,
  })

  if (!collection) {
    throw new ApiError(404, 'Collection not found')
  }

  const trimmedName = name.trim()
  const normalizedName = trimmedName.toLowerCase()

  const existingCollection = await CollectionModel.findOne({
    _id: { $ne: collection._id },
    organizationId: organization._id,
    parentCollectionId: collection.parentCollectionId,
    normalizedName,
  })

  if (existingCollection) {
    throw new ApiError(409, 'A collection with this name already exists here')
  }

  collection.name = trimmedName
  collection.normalizedName = normalizedName

  await collection.save()

  res.status(200).json(
    new ApiResponse(
      200,
      { collection },
      'Collection renamed successfully',
    ),
  )
})

export const deleteCollection = asyncHandler(async (req, res) => {
  const { collectionId } = req.params

  if (typeof collectionId !== 'string' || !Types.ObjectId.isValid(collectionId)) {
    throw new ApiError(400, 'Invalid Collection Id')
  }

  const userId = req.user?.id

  if (!userId) {
    throw new ApiError(401, 'Unauthorized')
  }

  const organization = await OrganizationModel.findOne({
    ownerId: userId,
  })

  if (!organization) {
    throw new ApiError(404, 'Organization not found')
  }

  const collection = await CollectionModel.findOne({
    _id: collectionId,
    organizationId: organization._id,
  })

  if (!collection) {
    throw new ApiError(404, 'Collection not found')
  }

  const collectionIdsToDelete: Types.ObjectId[] = [collection._id]
  let parentIdsToCheck: Types.ObjectId[] = [collection._id]

  while (parentIdsToCheck.length > 0) {
    const childCollections = await CollectionModel.find({
      organizationId: organization._id,
      parentCollectionId: { $in: parentIdsToCheck },
    }).select('_id')

    const childIds = childCollections.map((childCollection) => childCollection._id)

    collectionIdsToDelete.push(...childIds)
    parentIdsToCheck = childIds
  }

  const deleteResult = await CollectionModel.deleteMany({
    _id: { $in: collectionIdsToDelete },
    organizationId: organization._id,
  })

  res.status(200).json(
    new ApiResponse(
      200,
      {
        deletedCount: deleteResult.deletedCount,
        deletedCollectionIds: collectionIdsToDelete,
      },
      'Collection deleted successfully',
    ),
  )
})

