import { defaultState } from "./defaultState";
import { connectDB } from "./connect-db";

async function initializeDB() {
  let db = await connectDB();
  let user = await db.collection(`organizers`).findOne({ id: "U01" });
  if (!user) {
    for (let collectionName in defaultState) {
      let collection = db.collection(collectionName);
      await collection.insertMany(defaultState[collectionName]);
    }
  }
}

initializeDB();
