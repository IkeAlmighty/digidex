import express from "express";
import { connectToDatabase, closeConnection } from "../../db/connection.js";
import { validateEventData } from "../../utils/validation.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/:startEpochMs/:endEpochMs", async (req, res) => {
  try {
    const { startEpochMs, endEpochMs } = req.params;
    const db = await connectToDatabase();

    const eventsData = await db
      .collection("events")
      .aggregate([
        { startTime: { $gte: startEpochMs } },
        { endTime: {$lte: endEpochMs}}
    ]);

    res.json(eventsData);
  } catch (err) {
    console.dir(err);
    res.status(500).json({ message: "Server Side Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const _id = new ObjectId(req.params.id);

    const eventData = await db.collection("events").findOne({ _id });
    if (eventData) res.json(eventData);
    else
      res.status(404).json({ message: `id ${_id.toString()} does not exist` });
  } catch (err) {
    console.dir(err);
    res.status(500).json({ message: "Server Side Error" });
  }
});

router.post("/", async (req, res) => {
  const { time, location, backBlazeImgKey, description, rootTag } = req.body;

  // if event validation fails, tell the client and abort:

  if (!validateEventData(req.body)) {
    res.status(400).json({ message: "Incomplete event data" });
    return;
  }

  // send event to database:
  try {
    const db = await connectToDatabase();
    const mongoResponse = await db
      .collection("events")
      .insertOne({ time, location, backBlazeImgKey, description, rootTag });
    res.status(201).json({ id: mongoResponse.insertedId });
  } catch (err) {
    console.dir(err);
    res.status(500).send();
  }
});

router.put("/", async (req, res) => {
  const { _id, time, location, backBlazeImgKey, description, rootTag } =
    req.body;

  if (!_id) {
    console.error("_id is undefined in request body");
    res.status(400).send();
    return;
  }

  //purposefully exclude the _id field:
  const fields = { time, location, backBlazeImgKey, description, rootTag };

  // create an update document excluding undefined of fields:
  let updatedFields = {};
  Object.keys(fields).forEach((key) => {
    if (fields[key]) {
      updatedFields[key] = fields[key];
    }
  });

  // connect to database and update the document:
  try {
    const db = await connectToDatabase();
    const mongoResponse = await db.collection("events").updateOne(
      { _id: ObjectId.createFromHexString(_id) },
      {
        $set: {
          ...updatedFields,
        },
      }
    );

    if (mongoResponse.modifiedCount === 1) res.status(200).send();
    else {
      console.error("Document failed to update on POST api/events");
      res.status(500).send();
    }
  } catch (err) {
    console.dir(err);
    res.status(400).send();
  }
});

router.delete("/", async (req, res) => {
  const { _id } = req.body;

  try {
    const db = await connectToDatabase();
    const mongoRes = await db
      .collection("events")
      .deleteOne({ _id: ObjectId.createFromHexString(_id) });

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

export default router;
