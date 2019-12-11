import React from "react";
import * as mutations from "../store/mutations";
import { connect } from "react-redux";

const SignUp = ({ createNewUser, authenticated }) => {
  return (
    <div className="card p-3 col-4">
      <h2>Register New User</h2>
      <form onSubmit={createNewUser}>
        <div>
          {" "}
          <label>Username</label>
          <input
            type="text"
            placeholder="username"
            name="username"
            className="form-control"
          />
        </div>
        <div>
          {" "}
          <label className="mt-3">Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            className="form-control"
          />
        </div>
        {authenticated == mutations.USERNAME_EXISTS ? (
          <p>User already exists</p>
        ) : null}
        <button type="submit" className="btn btn-primary mt-3">
          Sign Up
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  autenticated: state.session.authenticated
});

const mapDispatchToProps = dispatch => ({
  createNewUser(e) {
    e.preventDefault();
    let username = e.target[`username`].value;
    let password = e.target[`password`].value;
    dispatch(mutations.requestCreateUser(username, password));
  }
});

export const ConnectedSignUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
