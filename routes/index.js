import eventRoutes from './api/events.js';
import tagRoutes from './api/tags.js';
import userRoutes from './api/users.js'
import express from 'express';

import auth from '../utils/auth.js'

const router = express.Router();

router.use('/api/events', auth, eventRoutes);
router.use('/api/tags', auth, tagRoutes);
router.use('/api/users', auth, userRoutes);

export default router;