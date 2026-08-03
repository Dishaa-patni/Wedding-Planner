import { model, Schema, Types } from "mongoose"


export interface MoodboardSection{
    name: string
    normalizedName: string
    organizationId: Types.ObjectId
    weddingWorkspaceId: Types.ObjectId
    isDefault: boolean
    position: number
    createdBy: Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

const moodboardSectionSchema = new Schema<MoodboardSection>(
{
    name:{
        type: String,
        required: true,
        trim: true,
        minLength:1,
        maxLength:80
    },
       normalizedName: {
      type: String,
      required: true,
      trim: true,
    },
    organizationId:{
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
        index: true
    },
    weddingWorkspaceId:{
        type: Schema.Types.ObjectId,
        ref: 'WeddingWorkspace',
        required: true,
        index: true
    },
    isDefault:{
        type: Boolean,
        default: false,
        index: true
    },
     position: {
      type: Number,
      required: true,
      default: 0,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

},{
    timestamps: true,
    versionKey: false
}
)

// fpor fetching sections in order 

moodboardSectionSchema.index({
  organizationId: 1,
  weddingWorkspaceId: 1,
  position: 1,
})

// For preventing duplicate section names inside the same wedding.

moodboardSectionSchema.index(
  {
    organizationId: 1,
    weddingWorkspaceId: 1,
    normalizedName: 1,
  },
  {
    unique: true,
  },
)

moodboardSectionSchema.index(
  {
    organizationId: 1,
    weddingWorkspaceId: 1,
    isDefault: 1,
  },
  {
    unique: true,
    partialFilterExpression: { isDefault: true },
  },
)

export const MoodBoardSectionModel = model<MoodboardSection>(
'MoodboardSection',
moodboardSectionSchema
)

