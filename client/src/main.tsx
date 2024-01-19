import ReactDOM from "react-dom/client";

// main app
import App from "./App.tsx";

// auth0
// import { Auth0Provider } from "@auth0/auth0-react";

// apollo client
import { ApolloProvider } from "@apollo/client";
import ApClient from "../apollo-client";

import "./index.css";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")!).render(
  /* <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      organization: import.meta.env.VITE_AUTH0_ORG_ID,
    }}
    useRefreshTokens={true}
  > */
  <ApolloProvider client={ApClient}>
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <App />
    </MantineProvider>
  </ApolloProvider>
  // </Auth0Provider>
);
