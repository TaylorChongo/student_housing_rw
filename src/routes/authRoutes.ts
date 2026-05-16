import { Request, Response, Router } from 'express';

const router = Router();

const authTemporarilyDisabled = (_req: Request, res: Response) => {
  res.status(503).json({ error: 'Authentication is temporarily disabled' });
};

router.post('/register', authTemporarilyDisabled);
router.post('/login', authTemporarilyDisabled);

export default router;
