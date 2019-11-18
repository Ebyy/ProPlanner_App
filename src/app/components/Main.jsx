import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ConnectedDashboard } from "./HomePage";
import { Router, Route } from "react-router-dome";
export const Main = () => {
  return (
      <Router history ={}>
              <Provider store={store}>
      <ConnectedDashboard />
    </Provider>
      </Router>

  );
};
