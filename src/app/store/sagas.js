import { take, put, select } from "redux-saga/effects";
import uuid from "uuid";
import axios from "axios";

import * as mutations from "./mutations";

const url = "http://localhost:8888";

export function* taskCreationSaga() {
  while (true) {
    const { statusID } = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerID = `U01`;
    const taskID = uuid();
    const categoryID = `G01`;
    yield put(mutations.createTask(taskID, statusID, ownerID, categoryID));
    const { res } = yield axios.post(url + `/tasks/new`, {
      task: {
        id: taskID,
        status: statusID,
        name: "New Task",
        category: categoryID,
        owner: ownerID
      }
    });
  }
}

export function* taskModificationSaga() {
  while (true) {
    const task = yield take([
      mutations.SET_TASK_CATEGORY,
      mutations.SET_TASK_NAME,
      mutations.SET_TASK_STATUS
    ]);
    axios.post(url + `/tasks/update`, {
      task: {
        id: taskID,
        status: statusID,
        name: "New Task",
        category: categoryID
      }
    });
  }
}

export function* userAuthenticationSaga() {
  while (true) {
    const { username, password } = yield take(
      mutations.REQUEST_AUTHENTICATE_USER
    );
    try {
      const { data } = axios(url + `/authenticate`, { username, password });
      if (!data) {
        throw new Error();
      }
    } catch (e) {
      console.log("cant authenticate");
      yield put(mutations.ProcessAuthenticateUser(mutations.NOT_AUTHENTICATED));
    }
  }
}
