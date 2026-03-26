import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['registered', 'attended', 'cancelled', 'waitlisted'],
      default: 'registered',
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: String,
      submittedAt: Date,
    },
    // Additional fields for event-specific requirements
    additionalInfo: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent duplicate registrations
registrationSchema.index({ event: 1, user: 1 }, { unique: true });

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;
