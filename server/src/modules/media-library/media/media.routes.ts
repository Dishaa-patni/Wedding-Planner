import { Router } from "express";
import { verifyJWT } from "../../../middlewares/auth.middleware.js";
import { upload } from "../../../middlewares/upload.middleware.js";
import { deleteMedia, getMedia, getMediaById, updateMedia, uploadMedia } from "./media.controller.js";

export const mediaRoute = Router()

mediaRoute.post('/media' , verifyJWT , upload.single('file') , uploadMedia)
mediaRoute.get('/media' , verifyJWT , getMedia)
mediaRoute.get('/media/:mediaId' , verifyJWT , getMediaById)
mediaRoute.patch('/media/:mediaId' , verifyJWT , updateMedia)
mediaRoute.delete('/media/:mediaId' , verifyJWT , deleteMedia)
