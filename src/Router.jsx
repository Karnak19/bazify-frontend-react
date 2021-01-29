import { BrowserRouter, Route, Switch } from "react-router-dom";

import OldPlayer from "./Player.old";
import Player from "./Player";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Player} />
          <Route exact path="/player" component={OldPlayer} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Router;
