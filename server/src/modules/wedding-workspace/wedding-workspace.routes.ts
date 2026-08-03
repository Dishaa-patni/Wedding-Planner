import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { createWeddingWorkspace, getWeddingWorspaceById, getWeddingWorspaces, updateWeddingWorkspace } from "./wedding-workspace.controller.js";


export const weddingWorkspaceRoute = Router()

weddingWorkspaceRoute.post('/' , verifyJWT , createWeddingWorkspace)
weddingWorkspaceRoute.get('/' , verifyJWT , getWeddingWorspaces)
weddingWorkspaceRoute.get('/:weddingId' , verifyJWT , getWeddingWorspaceById)
weddingWorkspaceRoute.patch('/:weddingId' , verifyJWT , updateWeddingWorkspace)
