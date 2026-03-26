import Registration from '../models/Registration.js';
import Event from '../models/Event.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Register for an event
// @route   POST /api/registrations
// @access  Private
export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if event has capacity
    if (event.maxParticipants && event.registeredCount >= event.maxParticipants) {
      return res.status(400).json({ message: 'Event is full' });
    }

    // Check if user is already registered
    const existingRegistration = await Registration.findOne({
      event: eventId,
      user: req.user._id,
    });

    if (existingRegistration) {
      return res.status(400).json({ message: 'You are already registered for this event' });
    }

    // Create registration
    const registration = await Registration.create({
      event: eventId,
      user: req.user._id,
      status: 'registered',
    });

    // Update event registered count
    event.registeredCount += 1;
    await event.save();

    // TODO: Send confirmation email to user
    // await sendEmail({
    //   to: req.user.email,
    //   subject: `Registration Confirmed: ${event.title}`,
    //   text: `You have successfully registered for ${event.title}`,
    // });

    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's registrations
// @route   GET /api/registrations/my-registrations
// @access  Private
export const getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user._id })
      .populate('event')
      .sort({ registrationDate: -1 });

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all registrations for an event
// @route   GET /api/registrations/event/:eventId
// @access  Private (Organizer/Admin)
export const getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is organizer or admin
    if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view registrations' });
    }

    const registrations = await Registration.find({ event: eventId })
      .populate('user', 'name email department enrollmentNumber phone')
      .sort({ registrationDate: -1 });

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel registration
// @route   DELETE /api/registrations/:id
// @access  Private
export const cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    // Check if user owns this registration
    if (registration.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this registration' });
    }

    // Update event registered count
    const event = await Event.findById(registration.event);
    if (event) {
      event.registeredCount = Math.max(0, event.registeredCount - 1);
      await event.save();
    }

    await registration.deleteOne();

    res.json({ message: 'Registration cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update registration status (mark as attended)
// @route   PUT /api/registrations/:id/status
// @access  Private (Organizer/Admin)
export const updateRegistrationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const registration = await Registration.findById(req.params.id).populate('event');

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    // Check if user is organizer or admin
    if (registration.event.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update registration status' });
    }

    registration.status = status;
    await registration.save();

    res.json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit feedback for event
// @route   POST /api/registrations/:id/feedback
// @access  Private
export const submitFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    // Check if user owns this registration
    if (registration.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to submit feedback' });
    }

    registration.feedback = {
      rating,
      comment,
      submittedAt: Date.now(),
    };

    await registration.save();

    res.json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
