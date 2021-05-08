import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AlbumPage from "./AlbumPage";
import Player from "./Player";
import Home from "./Home.tsx";
import Sidebar from "./Sidebar";

function Router() {
  return (
    <>
      <BrowserRouter>
        <div className="grid grid-cols-layout-xs md:grid-cols-layout-md text-emerald-50">
          <Sidebar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/albums" component={AlbumPage} />
          </Switch>
        </div>
        <Player />
      </BrowserRouter>
    </>
  );
}

export default Router;
