import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./connect-db";
import "./initialize-db";
import { authenticationRoute } from "./authenticate";

let port = 8888;
let app = express();
app.listen(port, console.info("Server listening on port", port));
app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());
authenticationRoute(app);

export const addNewTask = async task => {
  let db = await connectDB();
  let collection = db.collection(`tasks`);
  await collection.insertOne(task);
};

export const updateTask = async task => {
  let { id, status, category, name } = task;
  let db = await connectDB();
  let collection = db.collection(`tasks`);
  if (status) {
    await collection.updateOne(
      { id },
      {
        $set: { status }
      },
      (err, result) => {
        if (err) res.send(err);
        if (result) {
          console.log("updated task status");
        } else {
          console.log("ID not found! Failed to update task status");
        }
      }
    );
  }
  if (name) {
    await collection.updateOne(
      { id },
      {
        $set: { name }
      },
      (err, result) => {
        if (err) res.send(err);
        if (result) {
          console.log("updated task name ");
        } else {
          console.log("ID not found! Failed to update task name");
        }
      }
    );
  }
  if (category) {
    await collection.updateOne(
      { id },
      {
        $set: { category }
      },
      (err, result) => {
        if (err) res.send(err);
        if (result) {
          console.log("updated task category");
        } else {
          console.log("ID not found! Failed to update task category");
        }
      }
    );
  }
};

app.post("/tasks/new", async (req, res) => {
  let task = req.body.task;
  await addNewTask(task);
  res.status(200).send();
});

app.post("/tasks/update", async (req, res) => {
  let task = req.body.task;
  await updateTask(task);
  res.status(200).send();
});
