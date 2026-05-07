import { Router } from 'express';
import {
  sendMessage,
  getConversations,
  getMessageThread,
  markAsRead,
  getUnreadCount,
  markThreadAsRead,
} from '../controllers/messageController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.use(protect); // All message routes require authentication

router.post('/', sendMessage);
router.get('/', getConversations);
router.get('/unread-count', getUnreadCount);
router.get('/:listingId/:userId', getMessageThread);
router.put('/read', markThreadAsRead);
router.put('/:id/read', markAsRead);

export default router;
