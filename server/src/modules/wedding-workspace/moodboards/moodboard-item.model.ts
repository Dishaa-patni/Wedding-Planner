import { model, Schema, Types } from "mongoose";

export interface MoodboardItem {
    organizationId: Types.ObjectId
    weddingWorkspaceId: Types.ObjectId
    sectionId: Types.ObjectId
    mediaId: Types.ObjectId
    note: string
    addedBy: Types.ObjectId
    position: number
    createdAt: Date
    updatedAt: Date
}

const moodboardItemSchema = new Schema<MoodboardItem>(
    {

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
        sectionId:{
            type: Schema.Types.ObjectId,
            ref: 'MoodboardSection',
            required: true,
            index: true
        },
        mediaId:{
            type: Schema.Types.ObjectId,
            ref: 'Media',
            required: true,
            index: true
        },
        note:{
            type: String,
            trim: true,
            maxlength: 1000,
             default: '',
        },
          addedBy:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
         position: {
           type: Number,
           required: true,
            default: 0,
    },


    },{
        timestamps: true,
        versionKey: false
    }
)

export const MoodboardItemModel = model<MoodboardItem>('MoodboardItem' , moodboardItemSchema)