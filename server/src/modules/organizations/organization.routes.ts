import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { createOrganization, getCurrentOrganization } from "./organization.controller.js";

export const organizationRoutes = Router()

organizationRoutes.post('/' , verifyJWT , createOrganization)
organizationRoutes.get('/current' , verifyJWT , getCurrentOrganization)