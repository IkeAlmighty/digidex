import express from 'express';
import { connectToDatabase, closeConnection } from '../../db/connection.js';

const router = express.Router();

// responds with a list of all eventIds associated with the tag.
router.get('/:id', async () => {
    // 
});
router.post('/', async () => { });
router.put('/', async () => { });
router.delete('/', async () => { });

export default router;