import React from "react";
import { connect } from "react-redux";
import { requestTaskCreation } from "../store/mutations";
import { Link } from "react-router-dom";

export const Tasks = ({ tasks, name, id, addNewTask }) => (
  <div className="card p-3 m-2">
    <h3>{name}</h3>
    <div>
      {tasks.map(t => (
        <Link to={`/tasks/${t.id}`} key={t.id}>
          <div className="card p-3 mt-2"> {t.name}</div>
        </Link>
      ))}
    </div>

    <button onClick={() => addNewTask(id)} className="btn btn-primary mt-2">
      Add Task
    </button>
  </div>
);
const mapStateToProps = (state, ownProps) => {
  let statusID = ownProps.id;
  return {
    name: ownProps.name,
    id: statusID,
    tasks: state.tasks.filter(task => task.status === statusID),
    category: ownProps.category
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addNewTask(id) {
      dispatch(requestTaskCreation(id));
    }
  };
};

export const ConnectedTasks = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
