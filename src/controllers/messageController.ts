import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { listingId, content, receiverId } = req.body;
    const senderId = req.user?.id;
    const senderRole = req.user?.role;

    if (!listingId || !content) {
      return res.status(400).json({ error: 'listingId and content are required' });
    }

    const listing = await prisma.listing.findUnique({ where: { id: parseInt(listingId) } });
    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    let finalReceiverId = receiverId;

    // If student sends, receiver is the landlord
    if (senderRole === 'student') {
      finalReceiverId = listing.landlordId;
    } 
    // If landlord sends, they must provide the student's ID (receiverId)
    else if (senderRole === 'landlord' && !finalReceiverId) {
      return res.status(400).json({ error: 'receiverId is required for landlords' });
    }

    const message = await prisma.message.create({
      data: {
        content,
        listingId: parseInt(listingId),
        senderId: senderId!,
        receiverId: parseInt(finalReceiverId),
      },
    });

    res.status(201).json(message);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getConversations = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    // Fetch all messages involving the user
    const messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      include: {
        sender: { select: { id: true, name: true } },
        receiver: { select: { id: true, name: true } },
        listing: { select: { id: true, title: true, images: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Grouping logic
    const conversationsMap = new Map();

    messages.forEach((msg) => {
      const otherUser = msg.senderId === userId ? msg.receiver : msg.sender;
      const conversationKey = `${msg.listingId}-${otherUser.id}`;

      if (!conversationsMap.has(conversationKey)) {
        conversationsMap.set(conversationKey, {
          listing: msg.listing,
          otherUser: otherUser,
          lastMessage: {
            content: msg.content,
            createdAt: msg.createdAt,
            read: msg.read,
          },
        });
      }
    });

    res.json(Array.from(conversationsMap.values()));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMessageThread = async (req: AuthRequest, res: Response) => {
  try {
    const { listingId, userId: otherUserId } = req.params;
    const currentUserId = req.user?.id;

    const messages = await prisma.message.findMany({
      where: {
        listingId: parseInt(listingId),
        OR: [
          { senderId: currentUserId, receiverId: parseInt(otherUserId) },
          { senderId: parseInt(otherUserId), receiverId: currentUserId },
        ],
      },
      orderBy: { createdAt: 'asc' },
    });

    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const markAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const message = await prisma.message.findUnique({ where: { id: parseInt(id) } });

    if (!message) return res.status(404).json({ error: 'Message not found' });
    if (message.receiverId !== userId) return res.status(403).json({ error: 'Unauthorized' });

    const updatedMessage = await prisma.message.update({
      where: { id: parseInt(id) },
      data: { read: true },
    });

    res.json(updatedMessage);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
