import React, { StrictMode } from "react";
import { render } from "react-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

import Router from "./Router";
import { userContext } from "./contexts/user";

import "react-jinke-music-player/assets/index.css";
import "./styles/index.css";

const token = sessionStorage.getItem("token") || localStorage.getItem("token");

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL + "/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: token ? `Bearer ${token}` : "",
  },
});

function App() {
  return (
    <StrictMode>
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    </StrictMode>
  );
}

render(<App />, document.getElementById("root"));

serviceWorkerRegistration.register();
