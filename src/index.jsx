import React, { StrictMode } from "react";
import { render } from "react-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Router from "./Router";

import "react-jinke-music-player/assets/index.css";
import "./styles/index.css";

const queryClient = new QueryClient();

function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </StrictMode>
  );
}

render(<App />, document.getElementById("root"));

serviceWorkerRegistration.register();
