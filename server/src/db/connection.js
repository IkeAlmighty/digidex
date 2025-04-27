import { MongoClient, ServerApiVersion } from "mongodb";
import 'dotenv/config';
// Replace the placeholder with your Atlas connection string
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'polysched';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db = undefined;

// singleton since we only want one connection per process
async function connectToDatabase() {
    try {
        if (!db) {
            await client.connect();

            db = await client.db(dbName);
        }

        return db;
    } catch (err) {
        console.dir(err);
    }
}

async function closeConnection() {
    await client.close()
}

export { connectToDatabase, closeConnection };
