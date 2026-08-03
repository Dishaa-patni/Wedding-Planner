import { model, Schema, Types } from 'mongoose'

export interface Wedding {
  name: string
  normalizedName: string
  organizationId: Types.ObjectId
  createdBy: Types.ObjectId
  status: 'active' | 'archived'
  createdAt: Date
  updatedAt: Date
}

const weddingSchema = new Schema<Wedding>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
    },

    normalizedName: {
      type: String,
      required: true,
      trim: true,
    },

    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
      index: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    status: {
      type: String,
      enum: ['active', 'archived'],
      default: 'active',
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

weddingSchema.index(
  {
    organizationId: 1,
    normalizedName: 1,
  },
  {
    unique: true,
  },
)

export const WeddingWorkspaceModel = model<Wedding>('Wedding', weddingSchema)