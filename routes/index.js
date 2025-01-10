import eventRoutes from './api/events.js';
import tagRoutes from './api/tags.js';
import userRoutes from './api/users.js'
import express from 'express';

const router = express.Router();

router.use('/api/events', eventRoutes);
router.use('/api/tags', tagRoutes);
router.use('/api/users', userRoutes);

export default router;