import 'dotenv/config'
import app from './app.js'
import './config/cloudinary.js'
import { connectDB } from './config/db.js'


const PORT = process.env.PORT || 5000;


async function startServer(): Promise<void> {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server')
    console.error(error)
    process.exit(1)
  }
}

void startServer()
