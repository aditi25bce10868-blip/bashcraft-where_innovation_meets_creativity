const express = require('express')
const router = express.Router()
const Attendee = require('../models/Attendee')

// GET /api/certificate/:email — Get certificate data
router.get('/:email', async (req, res, next) => {
  try {
    const { email } = req.params

    if (!email) {
      return res.status(400).json({ message: 'Email is required' })
    }

    const attendee = await Attendee.findOne({ email })
    if (!attendee) {
      return res.status(404).json({ message: 'Attendee not found' })
    }

    if (!attendee.certificate.earned) {
      return res.status(404).json({ message: 'Certificate not earned yet' })
    }

    res.status(200).json({
      message: 'Certificate found',
      certificate: {
        attendeeName: attendee.name,
        attendeeEmail: attendee.email,
        college: attendee.college,
        earnedDate: attendee.certificate.earnedDate,
        certificateId: attendee._id,
      },
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
