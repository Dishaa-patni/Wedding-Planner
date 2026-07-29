import { model, Schema, Types, type HydratedDocument } from "mongoose";

export interface Media {
    organizationId: Types.ObjectId
    collectionId: Types.ObjectId | null
    url: string
    cloudinaryPublicId: string
    cloudinaryResourceType: string
    type: 'video' | 'image'
    size: number
    mimeType: string
    uploadedBy: Types.ObjectId
    originalName: string
    displayName: string
    createdAt: Date
    updatedAt: Date
}

export type MediaDocument = HydratedDocument<Media>

const mediaSchema = new Schema<Media>(
{
    organizationId:{
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
        index: true
    },

    collectionId:{
        type: Schema.Types.ObjectId,
        ref: 'Collection',
        default: null,
        index: true
    },

    url:{
        type: String,
        required: true
    },

    cloudinaryPublicId:{
        type: String,
        required: true
    },

    cloudinaryResourceType:{
        type: String,
        required: true
    },
    type:{
        type: String,
        enum: ['video' , 'image'],
        required: true
    },

    size:{
        type: Number,
        required: true
    },

    mimeType:{
        type: String,
        required: true
    },

    uploadedBy:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    },

    originalName:{
        type:String,
        required: true
    },

    displayName:{
        type: String,
        required: true

    }
},
  {
    timestamps: true,
    versionKey: false,
  },
)

mediaSchema.index({
  organizationId: 1,
  collectionId: 1,
  createdAt: -1,
})

export const MediaModel = model<Media>('Media' , mediaSchema)
