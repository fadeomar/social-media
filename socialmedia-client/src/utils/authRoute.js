import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function AuthRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      render={props =>
        authenticated ? <Redirect to="/" /> : <Component {...props} />
      }
      {...rest}
    />
  );
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

AuthRoute.propTypes = {
  authenticated: PropTypes.object.isRequired
};

export default connect(mapStateToProps, null)(AuthRoute);
