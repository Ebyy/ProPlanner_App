import React from "react";
import { connect } from "react-redux";
import { requestTaskCreation } from "../store/mutations";
import { Link } from "react-router-dom";

export const Tasks = ({ tasks, name, id, addNewTask }) => (
  <div>
    <div>
      <h3>{name}</h3>
      <div>
        {tasks.map(t => (
          <Link to={`/tasks/${t.id}`} key={t.id}>
            <div> {t.name}</div>
          </Link>
        ))}
      </div>
    </div>
    <button onClick={() => addNewTask(id)}>New Tasks</button>
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
      console.log("New task addition in progress on ...", id);
      dispatch(requestTaskCreation(id));
    }
  };
};

export const ConnectedTasks = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
