import React from "react";
import * as mutations from "../store/mutations";
import { connect } from "react-redux";

const Login = ({ authenticateUser, authenticated }) => (
  <div>
    <h2>Log in</h2>
    <form onSubmit={authenticateUser}>
      <label>Username</label>
      <div>
        <input
          type="text"
          placeholder="username"
          name="username"
          defaultValue="Danny S."
        />
      </div>
      <label>Password</label>
      <div>
        <input
          type="password"
          placeholder="password"
          name="password"
          defaultValue="123jx0."
        />
      </div>
      {authenticated === mutations.NOT_AUTHENTICATED ? (
        <p>Login failed! Ensure that your login details are correct.</p>
      ) : null}
      <button type="submit">Log in</button>
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
