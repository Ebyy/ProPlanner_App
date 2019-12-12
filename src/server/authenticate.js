import uuid from "uuid";
import md5 from "md5";
import { connectDB } from "./connect-db";

const authenticationTokens = [];

//set up state for saga to use
async function assembleUserState(user) {
  let db = await connectDB();

  let tasks = await db
    .collection(`tasks`)
    .find({ owner: user.id })
    .toArray();

  let status = await db
    .collection(`status`)
    .find({ owner: user.id })
    .toArray();

  return {
    tasks,
    status,
    session: { authenticated: `AUTHENTICATED`, id: user.id }
  };
}

//authenticate user login details
export const authenticationRoute = app => {
  app.post("/authenticate", async (req, res) => {
    let { username, password } = req.body;
    let db = await connectDB();
    let collection = db.collection(`organizers`);

    let user = await collection.findOne({ name: username });
    if (!user) {
      return res.status(500).send("User not found!");
    }
    let hash = md5(password);
    let passwordCorrect = hash === user.passwordHash;
    if (!passwordCorrect) {
      res.status(500).send("Password incorrect");
    }

    let token = uuid();

    authenticationTokens.push({
      token,
      userID: user.id
    });

    let state = await assembleUserState(user);
    res.send({ token, state });
  });

  //sign up user and set up dashboard
  app.post("/users/create-new", async (req, res) => {
    try {
      let { username, password } = req.body;
      let db = await connectDB();
      let collection = db.collection(`organizers`);
      let user = await collection.findOne({ name: username });
      if (user) {
        return res.status(500).send("Account already exists.");
      }
      let userID = uuid();
      let statusID = uuid();
      let taskID = uuid();

      await collection.insertOne({
        id: userID,
        name: username,
        passwordHash: md5(password)
      });

      //create task and status for new user
      await db.collection(`status`).insertOne({
        name: `To-Do`,
        id: statusID,
        owner: userID
      });
      await db.collection(`tasks`).insertOne({
        name: "New Task",
        category: "G01",
        id: taskID,
        owner: userID,
        status: statusID,
        owner: userID
      });

      let state = await assembleUserState({ id: userID, name: username });
      res.status(200).send({ userID, state });
    } catch (err) {
      console.log("Error occurred at sign up: ", err);
    }
  });
};
