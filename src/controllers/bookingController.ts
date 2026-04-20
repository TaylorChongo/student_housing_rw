import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { listingId, message, visitDate } = req.body;
    const studentId = req.user?.id;

    if (!listingId) {
      return res.status(400).json({ error: 'listingId is required' });
    }

    const listing = await prisma.listing.findUnique({ where: { id: parseInt(listingId) } });
    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    if (listing.landlordId === studentId) {
      return res.status(400).json({ error: 'You cannot book your own listing' });
    }

    // Optional: Check for duplicate active requests
    const existingBooking = await prisma.booking.findFirst({
      where: {
        listingId: parseInt(listingId),
        studentId: studentId!,
        status: 'pending',
      },
    });

    if (existingBooking) {
      return res.status(400).json({ error: 'You already have a pending request for this listing' });
    }

    const booking = await prisma.booking.create({
      data: {
        listingId: parseInt(listingId),
        studentId: studentId!,
        landlordId: listing.landlordId,
        message,
        visitDate: visitDate ? new Date(visitDate) : null,
      },
    });

    res.status(201).json(booking);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserBookings = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;
    const { status } = req.query;

    const where: any = {};
    if (status) where.status = status as string;

    if (role === 'student') {
      where.studentId = userId;
    } else if (role === 'landlord') {
      where.landlordId = userId;
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        listing: {
          select: { id: true, title: true, location: true, price: true, images: true },
        },
        student: {
          select: { id: true, name: true, email: true },
        },
        landlord: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookingById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
      include: {
        listing: true,
        student: { select: { name: true, email: true } },
        landlord: { select: { name: true, email: true } },
      },
    });

    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    if (booking.studentId !== userId && booking.landlordId !== userId) {
      return res.status(403).json({ error: 'Unauthorized to view this booking' });
    }

    res.json(booking);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBookingStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // accepted or rejected
    const landlordId = req.user?.id;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be accepted or rejected' });
    }

    const booking = await prisma.booking.findUnique({ where: { id: parseInt(id) } });

    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    if (booking.landlordId !== landlordId) return res.status(403).json({ error: 'Unauthorized' });
    if (booking.status !== 'pending') {
      return res.status(400).json({ error: 'Can only update status of pending bookings' });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    res.json(updatedBooking);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
