import multer from "multer";

const storage = multer.memoryStorage()

const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',

  'video/mp4',
  'video/quicktime',
  'video/webm',
]
// a function that will validate if the uploaded file video

const fileFilter: multer.Options['fileFilter'] = (
  req,
  file,
  callback,
) => {
  if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    callback(
      new Error(
        'Only JPEG, PNG, WebP, MP4, MOV and WebM files are allowed',
      ),
    )
    return
  }

  callback(null, true)
}

export const upload = multer({
    storage,
     limits: {
    fileSize: 100 * 1024 * 1024,
  },
  fileFilter
})