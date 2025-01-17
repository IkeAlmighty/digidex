import express from 'express';
import { connectToDatabase, closeConnection } from '../../db/connection.js';

const router = express.Router();

router.get('/', async () => { });
router.post('/', async () => { });
router.put('/', async () => { });
router.delete('/', async () => { });

export default router;