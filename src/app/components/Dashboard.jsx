import React from "react";
import { connect } from "react-redux";
import { ConnectedTasks } from "./Tasks";
import { Link } from "react-router-dom";

export const Dashboard = ({ status }) => {
  return (
    <div>
      {" "}
      <div className="row">
        {" "}
        <Link to="/">
          <p>Sign out</p>
        </Link>
      </div>
      <div className="row" id="tasksDiv">
        {status.map(s => (
          <ConnectedTasks id={s.id} name={s.name} key={s.id} className="col" />
        ))}
      </div>
      <div>
        <h3 className="mt-4">Status Stages</h3>

        {status.map(s => (
          <div key={s.id}>{s.name}</div>
        ))}
        <button className="btn btn-primary">+</button>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    status: state.status
  };
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
