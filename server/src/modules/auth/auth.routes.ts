import { Router } from 'express'
import { handleGoogleOAuthCallback, loginUser, redirectToGoogleOAuth, registerUser } from './auth.controller.js'

const authRouter = Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.get('/google', redirectToGoogleOAuth)
authRouter.get('/google/callback', handleGoogleOAuthCallback)

export default authRouter
