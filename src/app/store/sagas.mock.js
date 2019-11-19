import { take, put, select } from "redux-saga/effects";
import * as mutations from "./mutations";
import uuid from "uuid";

export function* taskCreationSaga() {
  while (true) {
    const { statusID } = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerID = `U01`;
    const taskID = uuid();
    const categoryID = `G01`;
    yield put(mutations.createTask(taskID, statusID, ownerID, categoryID));
    console.log("Got status ID", statusID);
  }
}
