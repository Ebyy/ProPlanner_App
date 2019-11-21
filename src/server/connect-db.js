import { MongoClient } from "mongodb";
const url = `mongodb://localhost:27017/proplanner-app`;
let db = null;

export async function connectDB() {
  if (db) return db;
  let client = await MongoClient.connect(url, { useNewUrlParser: true });
  db = client.db();
  console.info("GOt db, ", db);
  return db;
}

//connectDB();
