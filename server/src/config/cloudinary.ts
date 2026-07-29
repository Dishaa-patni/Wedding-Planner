import {v2 as cloudinary} from 'cloudinary'


console.log({
  hasCloudName: Boolean(process.env.CLOUDINARY_CLOUD_NAME),
  hasApiKey: Boolean(process.env.CLOUDINARY_API_KEY),
  hasApiSecret: Boolean(process.env.CLOUDINARY_API_SECRET),
})


const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

// since we are using typescript it can give errror as it can consider it as undefined as well
if(!cloudName || !apiKey || !apiSecret){
    throw new Error(
          'Cloudinary environment variables are not properly configured',
    )
}

// This registers your credentials with the Cloudinary SDK.

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
})

console.log("Cloudinary succesfull")

export default cloudinary