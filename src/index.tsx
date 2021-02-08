import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { Router } from 'react-router-dom';
import 'regenerator-runtime/runtime'
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>,
document.getElementById("app")
);