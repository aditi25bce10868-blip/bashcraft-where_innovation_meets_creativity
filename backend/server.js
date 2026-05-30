require('dotenv').config()
const express      = require('express')
const cors         = require('cors')
const authRoutes   = require('./routes/auth')
const certRoutes   = require('./routes/certificate')
const errorHandler = require('./middleware/errorHandler')

const app  = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

// Routes
app.use('/api/auth',        authRoutes)
app.use('/api/certificate', certRoutes)

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }))

// Error handler (must be last)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 BashCraft API running on http://localhost:${PORT}`)
})
