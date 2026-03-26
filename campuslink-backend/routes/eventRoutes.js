import express from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getMyEvents,
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getEvents);

// Protected routes
router.get('/user/my-events', protect, getMyEvents); // Place before dynamic ':id'
router.post('/', protect, authorizeRoles('organizer', 'admin'), createEvent);
router.put('/:id', protect, authorizeRoles('organizer', 'admin'), updateEvent);
router.delete('/:id', protect, authorizeRoles('organizer', 'admin'), deleteEvent);
router.get('/:id', getEventById);

export default router;
