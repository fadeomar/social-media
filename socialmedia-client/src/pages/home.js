import React, { Component } from "react";
import PropTypes from "prop-types";

import Scream from "../components/scream";
import Profile from "../components/profile";

import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";
import Grid from "@material-ui/core/Grid";

class Home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;
    let screamsMarkup = !loading
      ? screams.map(scream => {
          return <Scream key={scream.screamId} scream={scream} />;
        })
      : "Loding...";
    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getScreams })(Home);
