import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ConnectedDashboard } from "./HomePage";

export const Main = () => {
  return (
    <Provider store={store}>
      <ConnectedDashboard />
    </Provider>
  );
};
