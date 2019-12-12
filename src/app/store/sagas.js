import { take, put, select } from "redux-saga/effects";
import uuid from "uuid";
import axios from "axios";

import * as mutations from "./mutations";
import { history } from "./history";

const url = "http://localhost:8888";

export function* taskCreationSaga() {
  while (true) {
    const { statusID } = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerID = yield select(state => state.session.id);
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
        id: task.taskID,
        status: task.statusID,
        name: task.name,
        category: task.categoryID
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
      const { data } = yield axios.post(url + `/authenticate`, {
        username,
        password
      });
      if (!data) {
        throw new Error();
      }

      yield put(mutations.setState(data.state));
      yield put(mutations.ProcessAuthenticateUser(mutations.AUTHENTICATED));

      history.push("/dashboard");
    } catch (e) {
      console.log("Authentication failed: ", e);
      yield put(mutations.ProcessAuthenticateUser(mutations.NOT_AUTHENTICATED));
    }
  }
}

export function* userCreationSaga() {
  while (true) {
    const { username, password } = yield take(mutations.CREATE_USER);
    try {
      const { data } = yield axios.post(url + `/users/create-new`, {
        username,
        password
      });
      yield put(
        mutations.setState({ ...data.state, session: { id: data.userID } })
      );
      yield put(mutations.ProcessAuthenticateUser(mutations.AUTHENTICATED));

      history.push("/dashboard");
    } catch (err) {
      console.log("Error occurred: ", err);
      yield put(mutations.ProcessAuthenticateUser(mutations.USERNAME_EXISTS));
    }
  }
}
