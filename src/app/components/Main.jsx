import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ConnectedDashboard } from "./Dashboard";
import { Router, Route } from "react-router-dom";
import { history } from "../store/history";
import { ConnectedNavBar } from "./NavBar";
import { ConnectedTask } from "./Task";

export const Main = () => {
  return (
    <Router history={history}>
      <Provider store={store}>
        <div>
          <ConnectedNavBar />
          {/*<ConnectedDashboard /> */}
          <Route
            path="/dashboard"
            exact
            render={() => <ConnectedDashboard />}
          />
          <Route
            path="/tasks/:id"
            exact
            render={({ match }) => <ConnectedTask match={match} />}
          />
        </div>
      </Provider>
    </Router>
  );
};
