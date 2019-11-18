import React from "react";
import { connect } from "react-redux";
import { HomePage } from "./HomePage";

export const Tasks = ({ tasks, name }) => (
  <div>
    <div>
      <h3>{name}</h3>
      {tasks.map(t => (
        <div>{t.name}</div>
      ))}
    </div>
  </div>
);
const mapStateToProps = (state, taskProps) => {
  let statusID = taskProps.id;
  return {
    name: taskProps.name,
    id: statusID,
    tasks: state.tasks.filter(task => task.status === statusID),
    category: taskProps.category
  };
};

export const ConnectedTasks = connect(mapStateToProps)(Tasks);
