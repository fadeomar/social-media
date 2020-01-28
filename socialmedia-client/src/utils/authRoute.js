import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AuthRoute({
  component: Component,
  authenticated,
  ...rest
}) {
  return (
    <Route
      render={
        props =>
          authenticated ? <Redirect to="/" /> : <Component {...props} />
        // <Redirect to="/" />
      }
      {...rest}
    />
  );
}
