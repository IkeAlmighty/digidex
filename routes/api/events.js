import express from 'express';
import { connectToDatabase, closeConnection } from '../../db/connection.js';
import { validateEventData } from '../../utils/validation.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();

        const _id = new ObjectId(req.params.id)

        const eventData = await db.collection('events').findOne({ _id });
        if (eventData) res.json(eventData);
        else res.status(404).json({ message: `id ${_id.toString()} does not exist` })

    } catch (err) {
        console.dir(err);
        res.status(500).json({ message: "Server Side Error" })
    }
});

router.post('/', async (req, res) => {
    const { time, location, backBlazeImgKey, description, rootTag } = req.body;

    // if event validation fails, tell the client and abort:

    if (!validateEventData(req.body)) {
        res.status(400).json({ message: "Incomplete event data" });
        return;
    }

    // send event to database:
    try {
        const db = await connectToDatabase();
        const mongoResponse = await db.collection('events').insertOne({ time, location, backBlazeImgKey, description, rootTag });
        res.status(201).json({ id: mongoResponse.insertedId });
    } catch (err) {
        console.dir(err);
        res.status(500).send();
    }
});

router.put('/', async () => { });
router.delete('/', async () => { });

export default router;