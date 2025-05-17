import Event from "../models/Event.js";
import User from "../models/User.js";
import Tag from "../models/Tag.js";
import eventData from "./seedEvents.js";
import userData from "./seedUsers.js";
import db from "../db/connection.js";

db.once("open", seed);

async function seed() {
  try {
    // Clean existing data
    await Event.deleteMany({});
    await User.deleteMany({});
    await Tag.deleteMany({});

    for (const user of userData) {
      await User.create(user);
    }

    for (const e of eventData) {
      const username = e.owner;
      const tagData = e.tags;

      const owner = await User.findOne({ username });

      if (!owner) {
        console.log(`User with username ${e.owner} does not exist`);
        throw Error("User does not exist");
      }

      const tags = await createTagsFromData(tagData, owner);

      await Event.create({ ...e, owner, tags });
    }

    console.log("Seed completed 🌱");
  } catch (err) {
    console.error("Seed failed ❌", err);
    console.log(err);
  }

  db.close();
}

async function createTagsFromData(tagData, owner) {
  const tags = [];
  for (const value of tagData) {
    const exists = await Tag.findOne({ owner: owner._id, value });
    if (!exists) {
      const tag = await Tag.create({ owner: owner._id, value });
      tags.push(tag);
    } else tags.push(exists);
  }

  return tags;
}
