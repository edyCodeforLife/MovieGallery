import React, {useState, useEffect} from "react";
import { isEmpty } from 'lodash';
import "./app.scss";
import Main from "./routes";

const App = (props) => {
  return (
    <div className="full-screen">
        <Main {...props} />
    </div>
  );
};

export default App;
