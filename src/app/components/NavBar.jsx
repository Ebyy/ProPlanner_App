import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const NavBar = () => (
  <div>
    <Link to="/dashboard">
      <h3>Pro-planner App</h3>
    </Link>

  </div>
);

export const ConnectedNavBar = connect(state => state)(NavBar);
