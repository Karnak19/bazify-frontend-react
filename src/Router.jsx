import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Player from "./Player.tsx";
import Home from "./Home.tsx";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/player" component={Player} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Router;
