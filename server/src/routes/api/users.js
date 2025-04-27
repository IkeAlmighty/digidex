import express from 'express';
import { connectToDatabase, closeConnection } from '../../db/connection.js';

const router = express.Router();

router.get('/login', async () => { });
router.get('/:id', async () => { })
router.post('/register', async () => { });
router.delete('/subscriptions/:id', async () => { });

export default router;