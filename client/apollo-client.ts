import { ApolloClient, InMemoryCache } from "@apollo/client";

import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_SB_SERVER_GQL_URL,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_SB_SERVER_SUB_URL,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const ApClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default ApClient;
