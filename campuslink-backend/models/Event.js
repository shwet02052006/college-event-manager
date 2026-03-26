import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide event title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide event description'],
    },
    category: {
      type: String,
      enum: ['technical', 'cultural', 'sports', 'workshop', 'seminar', 'competition', 'other'],
      default: 'other',
    },
    date: {
      type: Date,
      required: [true, 'Please provide event date'],
    },
    startTime: {
      type: String,
      required: [true, 'Please provide start time'],
    },
    endTime: {
      type: String,
      required: [true, 'Please provide end time'],
    },
    venue: {
      type: String,
      required: [true, 'Please provide event venue'],
      trim: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    inCharge: {
      name: String,
      email: String,
      phone: String,
    },
    maxParticipants: {
      type: Number,
      default: null, // null means unlimited
    },
    registeredCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    poster: {
      type: String, // URL or file path
    },
    tags: [{
      type: String,
    }],
  },
  {
    timestamps: true,
  }
);

// Index for better search performance
eventSchema.index({ title: 'text', description: 'text' });

const Event = mongoose.model('Event', eventSchema);

export default Event;
