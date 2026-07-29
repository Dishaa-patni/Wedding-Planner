import { UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary.js";

// buffer-This parameter expects the actual binary contents of the uploaded file.
// folder-This is the Cloudinary folder where the file should be organized.

// This means the function does not immediately return the upload result. -> promise
export const uploadBufferToCloudinary = (
    buffer: Buffer,
    folder: string
): Promise<UploadApiResponse>=>{
return new Promise((resolve , reject)=>{

    // upload buffer to cloudinary since we are using memory 

    const uploadStream = cloudinary.uploader.upload_stream(

        //upload option
        // You accept both images and videos.Without auto, Cloudinary may assume the file is an image.
        {
            folder: folder,
            resource_type: "auto"
        },

        // the cloudinary callback
        (error , result)=>{
         if(error){
            // -> promise reject
            const message =
              error instanceof Error
                ? error.message
                : typeof error === 'object' && error !== null && 'message' in error
                  ? String(error.message)
                  : 'Cloudinary upload failed'

            reject(new Error(message))
            return
         }

         // due to typescript 
          if (!result) {
          reject(new Error('Cloudinary upload failed'))
          return
        }

        resolve(result)
        }
    )

//     Sends the bytes stored in buffer into the stream.
// Signals that there is no more file data to send.
    uploadStream.end(buffer)
})
}
