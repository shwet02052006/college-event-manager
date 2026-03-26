import express from 'express';
import {
  registerForEvent,
  getMyRegistrations,
  getEventRegistrations,
  cancelRegistration,
  updateRegistrationStatus,
  submitFeedback,
} from '../controllers/registrationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// All routes are protected
router.post('/', protect, registerForEvent);
router.get('/my-registrations', protect, getMyRegistrations);
router.get('/event/:eventId', protect, getEventRegistrations);
router.delete('/:id', protect, cancelRegistration);
router.put('/:id/status', protect, authorizeRoles('organizer', 'admin'), updateRegistrationStatus);
router.post('/:id/feedback', protect, submitFeedback);

export default router;
