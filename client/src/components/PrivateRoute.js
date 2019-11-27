import React from "react";
import { Route, Redirect } from "react-router-dom";

const isAuthenticated = () => {
  return sessionStorage.getItem("token");
};

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
