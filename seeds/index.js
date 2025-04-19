import events from "./seedEvents.js";
import { closeConnection, connectToDatabase } from "../db/connection.js";

async function seed() {
  try {
    const db = await connectToDatabase();

    // seed events:
    await db.collection("events").insertMany(events);

    console.log("Seed completed 🌱");
  } catch (err) {
    console.error("Seed failed ❌", err);
    console.log(err);
  } finally {
    await closeConnection();
  }
}

seed();
