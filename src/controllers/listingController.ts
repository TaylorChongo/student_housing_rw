import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

export const createListing = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, price, location, images, videos } = req.body;
    const landlordId = req.user?.id;

    if (!title || !description || !price || !location) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        location,
        images: images || [],
        videos: videos || [],
        landlordId: landlordId!,
      },
    });

    res.status(201).json(listing);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllListings = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, minPrice, maxPrice, location, availability } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where: any = {};
    if (minPrice) where.price = { ...where.price, gte: parseFloat(minPrice as string) };
    if (maxPrice) where.price = { ...where.price, lte: parseFloat(maxPrice as string) };
    if (location) where.location = { contains: location as string, mode: 'insensitive' };
    if (availability !== undefined) where.availability = availability === 'true';

    const listings = await prisma.listing.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        landlord: {
          select: { name: true, email: true },
        },
      },
    });

    const total = await prisma.listing.count({ where });

    res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      listings,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getListingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listing = await prisma.listing.findUnique({
      where: { id: parseInt(id) },
      include: {
        landlord: {
          select: { name: true, email: true },
        },
      },
    });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.json(listing);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateListing = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, price, location, images, videos, availability } = req.body;
    const landlordId = req.user?.id;

    const existingListing = await prisma.listing.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingListing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    if (existingListing.landlordId !== landlordId) {
      return res.status(403).json({ error: 'Unauthorized to update this listing' });
    }

    const updatedListing = await prisma.listing.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        price: price ? parseFloat(price) : undefined,
        location,
        images,
        videos,
        availability,
      },
    });

    res.json(updatedListing);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteListing = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const landlordId = req.user?.id;

    const existingListing = await prisma.listing.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingListing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    if (existingListing.landlordId !== landlordId) {
      return res.status(403).json({ error: 'Unauthorized to delete this listing' });
    }

    await prisma.listing.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Listing deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
