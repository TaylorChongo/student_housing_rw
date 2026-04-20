import { Router } from 'express';
import {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
} from '../controllers/bookingController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = Router();

router.use(protect); // All booking routes require authentication

router.post('/', authorize('student'), createBooking);
router.get('/', getUserBookings);
router.get('/:id', getBookingById);
router.put('/:id', authorize('landlord'), updateBookingStatus);

export default router;
