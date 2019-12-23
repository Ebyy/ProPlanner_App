import { MongoClient } from "mongodb";

//db conection string goes here
const url = process.env.MONGODB_URI;

let db = null;

export async function connectDB() {
  if (db) return db;
  let client = await MongoClient.connect(url, {
    useNewUrlParser: true
    //useUnifiedTopology: true
  });
  db = client.db();
  console.info("GOt db, ", db);
  return db;
}

//connectDB();
