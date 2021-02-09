import React from "react";
import { Switch, Route } from "react-router-dom";
import { HomePage } from "../container/list/index";
import { DetailPage } from '../container/detail/index';

const Main = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/detail" component={DetailPage} />
    </Switch>
  );
};

export default Main;
