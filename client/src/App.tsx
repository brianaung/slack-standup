// import { useSayHiQuery } from "./generated/fooGraphql";
import { Switch, Route } from "wouter";
import { HomePage } from "./pages";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect } from "react";

function App() {
  // const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  //
  // useEffect(() => {
  //   if (!isAuthenticated && !isLoading) {
  //     loginWithRedirect();
  //   }
  // }, [isAuthenticated, isLoading]);

  return (
    <>
      <Switch>
        <Route
          path={"/"}
          component={
            () => (
              // isLoading ? (
              //   <></>
              // ) : isAuthenticated ? (
              <HomePage />
              // ) : (
              // <Redirect to="/" />
            )
            // )
          }
        />
      </Switch>
    </>
  );
}

export default App;
