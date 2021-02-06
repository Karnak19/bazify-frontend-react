import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Player from './Player.tsx';
import PlayerInJS from './PlayerInJS';

function Router() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={PlayerInJS} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Router;
