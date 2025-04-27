import express from "express";
import { validateEventData } from "../../utils/validation.js";
import { ObjectId } from "mongodb";
import Event from "../../models/Event.js";

const router = express.Router();

router.get("/:startEpochMs/:endEpochMs", async (req, res) => {
  try {
    const { startEpochMs, endEpochMs } = req.params;

    const { user } = req;

    const eventsData = await Event.aggregate([
      { startTime: { $gte: startEpochMs } },
      { endTime: { $lte: endEpochMs } },
      { $unwind: tags },
      { tags: { $in: user.tags } },
      { $group: { _id: "$_id", tags: { $push: "$tags" } } },
    ]);

    res.json(eventsData);
  } catch (err) {
    console.dir(err);
    res.status(500).json({ message: "Server Side Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const _id = new ObjectId(req.params.id);

    const event = await Event.findById(_id);
    if (event) res.json(event);
    else
      res.status(404).json({ message: `id ${_id.toString()} does not exist` });
  } catch (err) {
    console.dir(err);
    res.status(500).json({ message: "Server Side Error" });
  }
});

router.post("/", async (req, res) => {
  const { time, location, imageKey, description, username } = req.body;

  // if event validation fails, tell the client and abort:

  if (!validateEventData(req.body)) {
    res.status(400).json({ message: "Incomplete event data" });
    return;
  }

  // send event to database:
  try {
    // find the owner:
    const owner = User.findOne({ username });

    if (!owner) {
      return res
        .status(404)
        .json({ message: `user of username ${username} does not exist.` });
    }

    await Event.insertOne({
      time,
      location,
      imageKey,
      description,
      owner,
    });
    res.status(201).json({ message: "added event to database" });
  } catch (err) {
    console.dir(err);
    res.status(500).send();
  }
});

router.put("/", async (req, res) => {
  const { _id, time, location, imageKey, description } = req.body;

  if (!_id) {
    console.error("_id is undefined in request body");
    res.status(400).send();
    return;
  }

  //purposefully exclude the _id field:
  const fields = { time, location, imageKey, description };

  // create an update document excluding undefined of fields:
  let updatedFields = {};
  Object.keys(fields).forEach((key) => {
    if (fields[key]) {
      updatedFields[key] = fields[key];
    }
  });

  // connect to database and update the document:
  try {
    const mongoResponse = await Event.updateOne(
      { id: _id },
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
    await Event.deleteOne({ id: _id });

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

export default router;
