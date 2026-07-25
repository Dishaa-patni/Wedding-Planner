import {Schema , model , Types} from 'mongoose'

const organizationSchema = new Schema(
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
        type: Types.ObjectId,
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

export const OrganizationModel = model('Organization' , organizationSchema )