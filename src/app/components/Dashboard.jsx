import React from "react";
import { connect } from "react-redux";
import { ConnectedTasks } from "./Tasks";

export const Dashboard = ({ status }) => {
  return (
    <div className="row">
      {status.map(s => (
        <ConnectedTasks id={s.id} name={s.name} key={s.id} className="col" />
      ))}
    </div>
  );
};
function mapStateToProps(state) {
  return {
    status: state.status
  };
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
