import { model, Schema, Types, type HydratedDocument } from "mongoose";

export interface Collection {
  name: string
  normalizedName: string
  organizationId: Types.ObjectId
  parentCollectionId: Types.ObjectId | null
  createdBy: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export type CollectionDocument = HydratedDocument<Collection>

const collectionSchema = new Schema<Collection>(
    {
      name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 80,
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

    parentCollectionId:{
        type: Schema.Types.ObjectId,
        ref: 'Collection',
        default: null,
        index: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    },
    {
    timestamps: true,
    versionKey: false,
  },
)

collectionSchema.index(
    {
        organizationId: 1,
        parentCollectionId: 1,
        normalizedName: 1

    },
     {
    unique: true,
  },
)

export const CollectionModel = model<Collection>('Collection' , collectionSchema )
