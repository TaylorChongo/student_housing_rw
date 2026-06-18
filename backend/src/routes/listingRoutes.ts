import { Router } from 'express';
import {
  createListing,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
} from '../controllers/listingController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getAllListings);
router.get('/:id', getListingById);

router.post('/', protect, authorize('landlord'), createListing);
router.put('/:id', protect, authorize('landlord'), updateListing);
router.delete('/:id', protect, authorize('landlord'), deleteListing);

export default router;
