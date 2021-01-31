import { BrowserRouter, Route, Switch } from "react-router-dom";

import Player from "./Player";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Player} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Router;
