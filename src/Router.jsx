import { BrowserRouter, Route, Switch } from "react-router-dom";
import Player from "./Player";
import OriginalPlayer from "./OriginalPlayer";
import Song from "./Song";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/" component={OriginalPlayer} /> */}
          <Route exact path="/" component={Player} />
          <Route path="/songs/:id" component={Song} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Router;
