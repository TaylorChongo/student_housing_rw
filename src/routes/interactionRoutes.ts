import { Router } from 'express';
import {
  sendInquiry,
  getStudentInquiries,
  getLandlordInquiries,
  toggleFavorite,
  getMyFavorites,
} from '../controllers/interactionController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = Router();

// Inquiries
router.post('/inquiries', protect, authorize('student'), sendInquiry);
router.get('/inquiries/student', protect, authorize('student'), getStudentInquiries);
router.get('/inquiries/landlord', protect, authorize('landlord'), getLandlordInquiries);

// Favorites
router.post('/favorites/toggle', protect, authorize('student'), toggleFavorite);
router.get('/favorites', protect, authorize('student'), getMyFavorites);

export default router;
