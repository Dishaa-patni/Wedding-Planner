import mongoose from 'mongoose'

export async function connectDB(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI
  const dbName = process.env.MONGODB_DB_NAME || 'wedding-planner'

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined')
  }

  await mongoose.connect(mongoUri, { dbName })
  console.log(`MongoDB connected to ${dbName}`)
}
