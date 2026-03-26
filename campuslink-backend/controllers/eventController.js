import Event from '../models/Event.js';
import Registration from '../models/Registration.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (Organizer/Admin)
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      date,
      startTime,
      endTime,
      venue,
      inCharge,
      maxParticipants,
      isPublic,
      poster,
      tags,
    } = req.body;

    const event = await Event.create({
      title,
      description,
      category,
      date,
      startTime,
      endTime,
      venue,
      organizer: req.user._id,
      inCharge,
      maxParticipants,
      isPublic,
      poster,
      tags,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all events (with filters)
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
  try {
    const { category, status, search } = req.query;

    // Build filter query
    const filter = {};
    
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const events = await Event.find(filter)
      .populate('organizer', 'name email')
      .sort({ date: 1 }); // Sort by date ascending

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email department');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Organizer/Admin)
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is the organizer or admin
    if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }

    // Update fields
    Object.keys(req.body).forEach((key) => {
      event[key] = req.body[key];
    });

    const updatedEvent = await event.save();

    // TODO: Send email notification to registered users about event update

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Organizer/Admin)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is the organizer or admin
    if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    await event.deleteOne();

    // TODO: Send cancellation email to registered users

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get events created by current user
// @route   GET /api/events/my-events
// @access  Private
export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user._id }).sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
