export const REQUEST_TASK_CREATION = `REQUEST_TASK_CREATION`;
export const CREATE_TASK = `CREATE_TASK`;
export const SET_TASK_STATUS = `SET_TASK_STATUS`;
export const SET_TASK_CATEGORY = `SET_TASK_CATEGORY`;
export const SET_TASK_NAME = `SET_TASK_NAME`;
export const REQUEST_STATUS_CREATION = `REQUEST_STATUS_CREATION`;
export const CREATE_STATUS = `CREATE_STATUS`;
export const REQUEST_AUTHENTICATE_USER = `REQUEST_AUTHENTICATE_USER`;
export const PROCESSING_AUTHENTICATE_USER = `PROCESSING_AUTHENTICATE_USER`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;
export const SET_STATE = `SET_STATE`;
export const CREATE_USER = `CREATE_USER`;
export const USERNAME_EXISTS = `USERNAME_EXISTS`;
export const SET_STATUS_NAME = `SET_STATUS_NAME`;

//TASKS
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

//STATUS

export const requestStatusCreation = ownerID => ({
  type: REQUEST_STATUS_CREATION,
  ownerID
});

export const createNewStatusItem = (statusID, ownerID) => ({
  type: CREATE_STATUS,
  statusID,
  ownerID
});

export const setStatusName = (statusID, name)=>({
  type: SET_STATUS_NAME,
  statusID,
  name
})

//USER AUTHENTICATION

export const setState = (state = {}) => ({
  type: SET_STATE,
  state
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

export const requestCreateUser = (username, password) => ({
  type: CREATE_USER,
  username,
  password
});
