import { Router } from 'express';
import {
  sendMessage,
  getConversations,
  getMessageThread,
  markAsRead,
} from '../controllers/messageController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.use(protect); // All message routes require authentication

router.post('/', sendMessage);
router.get('/', getConversations);
router.get('/:listingId/:userId', getMessageThread);
router.put('/:id/read', markAsRead);

export default router;
