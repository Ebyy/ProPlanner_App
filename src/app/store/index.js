import { createStore, applyMiddleware, combineReducers } from "redux";
import { defaultState } from "../../server/defaultState";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();
//import * as sagas from "./sagas.mock";
import * as sagas from "./sagas";
import * as mutations from "./mutations";

export const store = createStore(
  combineReducers({
    session(session = defaultState.session ||{}, action) {
      let {type, authenticated, session} = action;
      switch(type){
        case mutat
      }
      return session;
    },
    tasks(tasks = defaultState.tasks, action) {
      switch (action.type) {
        case mutations.CREATE_TASK:
          //console.log(action);
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
    comments(comments = defaultState.comments) {
      return comments;
    },
    status(status = defaultState.status) {
      return status;
    },
    organizers(organizers = defaultState.organizers) {
      return organizers;
    },
    category(category = defaultState.category) {
      return category;
    }
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
