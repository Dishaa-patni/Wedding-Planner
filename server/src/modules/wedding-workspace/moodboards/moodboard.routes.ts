import { Router } from "express";
import { verifyJWT } from "../../../middlewares/auth.middleware.js";
import { addMoodboardItem, createMoodboardSections, getMoodboardSections } from "./moodboard.controller.js";


export const moodboardRoute = Router()

moodboardRoute.post('/:weddingId/moodboard/sections' , verifyJWT , createMoodboardSections)
moodboardRoute.get('/:weddingId/moodboard/sections' , verifyJWT , getMoodboardSections)
moodboardRoute.post('/:weddingId/moodboard/items' , verifyJWT , addMoodboardItem)