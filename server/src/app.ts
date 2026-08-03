import cors from 'cors'
import express from 'express'
import { errorHandler } from './middlewares/error.middleware.js'
import authRoutes from './modules/auth/auth.routes.js'
import { ApiError } from './utils/api-error.js'
import { ApiResponse } from './utils/api-response.js'
import { organizationRoutes } from './modules/organizations/organization.routes.js'
import { mediaCollectionRoute} from './modules/media-library/collections/collection.routes.js'
import { mediaRoute } from './modules/media-library/media/media.routes.js'
import { weddingWorkspaceRoute } from './modules/wedding-workspace/wedding-workspace.routes.js'
import { moodboardRoute } from './modules/wedding-workspace/moodboards/moodboard.routes.js'


const app = express()

const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000'

app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  }),
)
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.status(200).json(new ApiResponse(200, null, 'Server is healthy'))
})

app.use('/api/auth', authRoutes)
app.use('/api/organizations', organizationRoutes)
app.use('/api/v1/media-library', mediaCollectionRoute)
app.use('/api/v1/media-library', mediaRoute)
app.use('/api/v1/wedding-workspaces', weddingWorkspaceRoute)
app.use('/api/v1/wedding-workspaces' , moodboardRoute)


app.use((_req, _res, next) => {
  next(new ApiError(404, 'Route not found'))
})

app.use(errorHandler)

export default app
