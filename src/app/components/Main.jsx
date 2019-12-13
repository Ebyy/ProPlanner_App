import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ConnectedDashboard } from "./Dashboard";
import { ConnectedLogin } from "./Login";
import { ConnectedSignUp } from "./SignUp";
import { Router, Route } from "react-router-dom";
import { history } from "../store/history";
import { ConnectedNavBar } from "./NavBar";
import { ConnectedTask } from "./Task";
import { Redirect } from "react-router";
import { ConnectedStatusItem } from "./StatusItem";

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
          <Route exact path="/register" component={ConnectedSignUp} />
          <Route
            exact
            path="/dashboard"
            //render={() => <ConnectedDashboard />}
            render={RouteGuard(ConnectedDashboard)}
          />
          <Route exact path="/tasks/:id" render={RouteGuard(ConnectedTask)} />
          <Route
            exact
            path="/status/:id"
            render={RouteGuard(ConnectedStatusItem)}
          />
        </div>
      </Provider>
    </Router>
  );
};
