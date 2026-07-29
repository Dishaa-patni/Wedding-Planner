import { Schema, model, Types, type HydratedDocument } from 'mongoose'

export interface Organization {
  name: string
  logoUrl: string | null
  ownerId: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export type OrganizationDocument = HydratedDocument<Organization>

const organizationSchema = new Schema<Organization>(
    {
      name:{
        type : String , 
        required: true,
        trim: true,
        minlength: 2 , 
        maxlength: 100,
      },

      logoUrl:{
        type: String,
        default: null
      },

      ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
      }

      
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export const OrganizationModel = model<Organization>('Organization' , organizationSchema )
