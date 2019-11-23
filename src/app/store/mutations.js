export const REQUEST_TASK_CREATION = `REQUEST_TASK_CREATION`;
export const CREATE_TASK = `CREATE_TASK`;
export const SET_TASK_STATUS = `SET_TASK_STATUS`;
export const SET_TASK_CATEGORY = `SET_TASK_CATEGORY`;
export const SET_TASK_NAME = `SET_TASK_NAME`;
export const REQUEST_AUTHENTICATE_USER = `REQUEST_AUTHENTICATE_USER`;
export const PROCESSING_AUTHENTICATE_USER = `PROCESSING_AUTHENTICATE_USER`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;

export const requestTaskCreation = statusID => ({
  type: REQUEST_TASK_CREATION,
  statusID
});

export const createTask = (taskID, statusID, ownerID, categoryID) => ({
  type: CREATE_TASK,
  taskID,
  statusID,
  ownerID,
  categoryID
});

export const setTaskCategory = (taskID, categoryID) => ({
  type: SET_TASK_CATEGORY,
  taskID,
  categoryID
});

export const setTaskName = (taskID, name) => ({
  type: SET_TASK_NAME,
  taskID,
  name
});

export const setTaskStatus = (taskID, statusID) => ({
  type: SET_TASK_STATUS,
  taskID,
  statusID
});

export const requestAuthenticateUser = (username, password) => ({
  type: REQUEST_AUTHENTICATE_USER,
  username,
  password
});

export const ProcessAuthenticateUser = (
  status = AUTHENTICATING,
  session = null
) => ({
  type: PROCESSING_AUTHENTICATE_USER,
  session,
  authenticated: status
});
