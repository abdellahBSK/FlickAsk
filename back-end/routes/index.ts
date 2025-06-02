// routes/index.ts
import { Router } from 'express';

import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import videoRoutes from './video.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/videos', videoRoutes);

export default router;
