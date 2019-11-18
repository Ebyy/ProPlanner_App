import React from "react";
import { connect } from "react-redux";
import { ConnectedTasks } from "./Tasks";
import { STATUS_CODES } from "http";

export const HomePage = ({ status }) => {
  return (
    <div>
      <h2>My Dashboard</h2>
      {status.map(s => (
        <ConnectedTasks id={s.id} name={s.name} key={s.id} />
      ))}
    </div>
  );
};
function mapStateToProps(state) {
  return {
    status: state.status
  };
}

export const ConnectedDashboard = connect(mapStateToProps)(HomePage);
