import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ConnectedDashboard } from "./Dashboard";
import { ConnectedLogin } from "./Login";
import { Router, Route } from "react-router-dom";
import { history } from "../store/history";
import { ConnectedNavBar } from "./NavBar";
import { ConnectedTask } from "./Task";
import { Redirect } from "react-router";

const RouteGuard = Component => ({ match }) => {
  console.info("Route guard", match);
  if (!store.getState().session.authenticated) {
    return <Redirect to="/" />;
  }
  {
    return <Component match={match} />;
  }
};

export const Main = () => {
  return (
    <Router history={history}>
      <Provider store={store}>
        <div>
          <ConnectedNavBar />
          {/*<ConnectedDashboard /> */}
          <Route exact path="/" component={ConnectedLogin} />
          <Route
            path="/dashboard"
            exact
            //render={() => <ConnectedDashboard />}
            render={RouteGuard(ConnectedDashboard)}
          />
          <Route path="/tasks/:id" exact render={RouteGuard(ConnectedTask)} />
        </div>
      </Provider>
    </Router>
  );
};
