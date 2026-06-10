const mongoose = require('mongoose')

async function connectDB() {
  try {
    if (!process.env.DB_URI) {
      throw new Error('DB_URI not defined in .env file')
    }

    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('✅ MongoDB connected successfully')
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

module.exports = connectDB
