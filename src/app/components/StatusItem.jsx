import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setStatusName } from "../store/mutations";

export const StatusItem = ({ id, statusItem, setStatusName }) => (
  <div className="form">
    <div className="card p-2">
      <label>Status Name: </label>
      <input
        type="text"
        value={statusItem.name}
        onChange={setStatusName}
        className="form-control"
      />
    </div>

    <Link to="/dashboard">
      {" "}
      <button className="btn btn-primary">Save</button>
    </Link>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let statusItem = state.status.find(s => s.id === id);
  return {
    id,
    statusItem
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    setStatusName(event) {
      dispatch(setStatusName(id, event.target.value));
    }
  };
};

export const ConnectedStatusItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusItem);
