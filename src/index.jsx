import React, { StrictMode } from "react";
import { render } from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import Router from "./Router";

import "react-jinke-music-player/assets/index.css";
import "./styles/index.css";
import { SongsProvider } from "./contexts/song";

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
        <SongsProvider>
          <Router />
        </SongsProvider>
      </ApolloProvider>
    </StrictMode>
  );
}

render(<App />, document.getElementById("root"));
