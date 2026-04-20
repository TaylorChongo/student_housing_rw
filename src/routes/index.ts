import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import listingRoutes from './listingRoutes';
import interactionRoutes from './interactionRoutes';
import messageRoutes from './messageRoutes';
import bookingRoutes from './bookingRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/listings', listingRoutes);
router.use('/interactions', interactionRoutes);
router.use('/messages', messageRoutes);
router.use('/bookings', bookingRoutes);

export default router;
