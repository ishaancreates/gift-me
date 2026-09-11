import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add MONGODB_URI to .env.local");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

const client = new MongoClient(uri);

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri as string);
  const db = client.db(); // Connects to the database specified in connection URI ("gift-me")

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default client;