const express = require('express')
const router = express.Router()
const Attendee = require('../models/Attendee')

// POST /api/auth/register — Register a new attendee
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, college } = req.body

    // Validate input
    if (!name || !email || !college) {
      return res.status(400).json({ message: 'Name, email, and college are required' })
    }

    // Check if email already exists
    const existingAttendee = await Attendee.findOne({ email })
    if (existingAttendee) {
      return res.status(409).json({ message: 'Email already registered' })
    }

    // Create new attendee
    const newAttendee = new Attendee({ name, email, college })
    await newAttendee.save()

    res.status(201).json({
      message: 'Registration successful',
      attendee: {
        id: newAttendee._id,
        name: newAttendee.name,
        email: newAttendee.email,
        college: newAttendee.college,
      },
    })
  } catch (error) {
    next(error)
  }
})

// POST /api/auth/login — Login attendee
router.post('/login', async (req, res, next) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: 'Email is required' })
    }

    // Find attendee by email
    const attendee = await Attendee.findOne({ email })
    if (!attendee) {
      return res.status(404).json({ message: 'Attendee not found. Please register first.' })
    }

    res.status(200).json({
      message: 'Login successful',
      attendee: {
        id: attendee._id,
        name: attendee.name,
        email: attendee.email,
        college: attendee.college,
        emailVerified: attendee.emailVerified,
        attended: attendee.attended,
      },
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
