import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

// --- INQUIRIES ---

export const sendInquiry = async (req: AuthRequest, res: Response) => {
  try {
    const { listingId, message } = req.body;
    const studentId = req.user?.id;

    if (!listingId || !message) {
      return res.status(400).json({ error: 'Please provide listingId and message' });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        message,
        listingId: parseInt(listingId),
        studentId: studentId!,
      },
    });

    res.status(201).json(inquiry);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentInquiries = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.user?.id;
    const inquiries = await prisma.inquiry.findMany({
      where: { studentId },
      include: {
        listing: {
          select: { title: true, location: true, price: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(inquiries);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getLandlordInquiries = async (req: AuthRequest, res: Response) => {
  try {
    const landlordId = req.user?.id;
    const inquiries = await prisma.inquiry.findMany({
      where: {
        listing: { landlordId },
      },
      include: {
        student: {
          select: { name: true, email: true },
        },
        listing: {
          select: { title: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(inquiries);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// --- FAVORITES ---

export const toggleFavorite = async (req: AuthRequest, res: Response) => {
  try {
    const { listingId } = req.body;
    const userId = req.user?.id;

    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_listingId: {
          userId: userId!,
          listingId: parseInt(listingId),
        },
      },
    });

    if (existingFavorite) {
      await prisma.favorite.delete({
        where: { id: existingFavorite.id },
      });
      return res.json({ message: 'Removed from favorites' });
    } else {
      await prisma.favorite.create({
        data: {
          userId: userId!,
          listingId: parseInt(listingId),
        },
      });
      return res.json({ message: 'Added to favorites' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyFavorites = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        listing: true,
      },
    });
    res.json(favorites);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
