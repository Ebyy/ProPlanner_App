import React from "react";
import * as mutations from "../store/mutations";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Login = ({ authenticateUser, authenticated }) => (
  <div className="card p-3 col-4">
    <h2>Log in</h2>{" "}
    <p>
      Don't have an account?
      <Link to="register"> Sign up here.</Link>
    </p>
    <form onSubmit={authenticateUser}>
      <div>
        <label>Username</label>
        <input
          type="text"
          placeholder="username"
          name="username"
          defaultValue=""
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
          defaultValue=""
          className="form-control"
        />
      </div>
      {authenticated === mutations.NOT_AUTHENTICATED ? (
        <p>Login failed! Ensure that your login details are correct.</p>
      ) : null}
      <button type="submit" className="form-control btn btn-primary mt-3">
        Log in
      </button>
    </form>
  </div>
);

const mapStateToProps = ({ session }) => ({
  authenticated: session.authenticated
});

const mapDispatchToProps = dispatch => ({
  authenticateUser(e) {
    e.preventDefault();
    let username = e.target[`username`].value;
    let password = e.target[`password`].value;
    dispatch(mutations.requestAuthenticateUser(username, password));
  }
});

export const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
