import React from "react";
import { Grommet } from "grommet";
import { grommet } from "grommet/themes";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

import Login from "./screens/login/Login";
import HomePage from "./screens/homepage/HomePage";

const { REACT_APP_GRAPH_QL: graphqlHost } = process.env;

const httpLink = createHttpLink({
  uri: graphqlHost
});

const apolloClient = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Grommet theme={grommet}>
        <Router>
          <Route path="/" exact component={Login} />
          <Route path="/HomePage" component={HomePage} />
        </Router>
      </Grommet>
    </ApolloProvider>
  );
}

export default App;
