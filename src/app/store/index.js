import { createStore, applyMiddleware, combineReducers } from "redux";
import { defaultState } from "../../server/defaultState";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

import * as sagas from "./sagas";
import * as mutations from "./mutations";

export const store = createStore(
  combineReducers({
    session(userSession = defaultState.session || {}, action) {
      let { type, authenticated, session } = action;
      switch (type) {
        case mutations.SET_STATE:
          return { ...userSession, id: action.state.session.id };
        case mutations.REQUEST_AUTHENTICATE_USER:
          return { ...userSession, authenticated: mutations.AUTHENTICATING };
        case mutations.PROCESSING_AUTHENTICATE_USER:
          return { ...userSession, authenticated };
        default:
          return userSession;
      }
    },
    tasks(tasks = [], action) {
      switch (action.type) {
        case mutations.SET_STATE:
          return action.state.tasks;
        case mutations.CREATE_TASK:
          return [
            ...tasks,
            {
              id: action.taskID,
              name: "New Task",
              status: action.statusID,
              owner: action.ownerID,
              category: action.categoryID
            }
          ];
        case mutations.SET_TASK_STATUS:
          return tasks.map(task => {
            return task.id === action.taskID
              ? { ...task, status: action.statusID }
              : task;
          });
        case mutations.SET_TASK_NAME:
          return tasks.map(task => {
            return task.id === action.taskID
              ? { ...task, name: action.name }
              : task;
          });
        case mutations.SET_TASK_CATEGORY:
          return tasks.map(task => {
            return task.id === action.taskID
              ? { ...task, category: action.categoryID }
              : task;
          });
      }
      return tasks;
    },
    comments(comments = []) {
      return comments;
    },
    status(status = [], action) {
      switch (action.type) {
        case mutations.SET_STATE:
          return action.state.status;
      }
      return status;
    },
    organizers(organizers = [], action) {
      switch (action.type) {
        case mutations.SET_STATE:
          return action.state.status;
      }
      return organizers;
    },
    category(category = []) {
      return category;
    }
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
