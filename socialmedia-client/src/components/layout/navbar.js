import React, { Component } from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

import { connect } from "react-redux";

import CustomButton from "../../utils/CustomButton";
import PostScream from "../scream/PostScream";

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <>
              <PostScream />
              <Link to="/">
                <CustomButton tip="Home">
                  <HomeIcon color="secondary" />
                </CustomButton>
              </Link>
              <CustomButton tip="notifiactions">
                <Notifications color="secondary" />
              </CustomButton>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

// Navbar.proptypes = {
//   authenticated: PropTypes.object.isRequired
// };

export default connect(mapStateToProps)(Navbar);
