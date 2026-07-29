import { Router } from "express";
import { verifyJWT } from "../../../middlewares/auth.middleware.js";
import {
  createCollection,
  deleteCollection,
  getCollection,
  getCollectionByID,
  updateCollectionName,
} from "./collection.controller.js";


export const mediaCollectionRoute = Router()

mediaCollectionRoute.post('/collections' , verifyJWT , createCollection)
mediaCollectionRoute.get('/collections' , verifyJWT , getCollection)
mediaCollectionRoute.get('/collections/:collectionId' , verifyJWT , getCollectionByID)
mediaCollectionRoute.patch('/collections/:collectionId' , verifyJWT , updateCollectionName)
mediaCollectionRoute.delete('/collections/:collectionId' , verifyJWT , deleteCollection)
