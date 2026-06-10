const mongoose = require('mongoose')

const attendeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    college: {
      type: String,
      required: true,
      trim: true,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    certificate: {
      earned: {
        type: Boolean,
        default: false,
      },
      earnedDate: Date,
    },
    attended: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Attendee', attendeeSchema)
