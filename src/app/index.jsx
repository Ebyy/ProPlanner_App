import { store } from "./store";
import React from "react";
import ReactDOM from "react-dom";
import { Main } from "./components/Main";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faPlane } from "@fortawesome/free-solid-svg-icons";

library.add(faHome, faPlane);

ReactDOM.render(<Main />, document.getElementById("app"));
