import React from "react";
import { connect } from "react-redux";
import { ConnectedTasks } from "./Tasks";
import { Link } from "react-router-dom";
import { requestStatusCreation } from "../store/mutations";

export const Dashboard = ({ status, id, createNewStatusItem }) => {
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
          <Link to={`/status/${s.id}`} key={s.id}>
            <div>{s.name}</div>
          </Link>
        ))}
        <button
          className="btn btn-primary"
          onClick={() => createNewStatusItem(id)}
        >
          +
        </button>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    status: state.status,
    id: state.session.id
  };
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createNewStatusItem(id) {
      console.log("Just added new status ...");
      dispatch(requestStatusCreation(id));
    }
  };
};

export const ConnectedDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
