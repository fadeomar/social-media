import React, { Component } from "react";
import axios from "axios";

import Scream from "../components/scream";
import Profile from "../components/profile";

import Grid from "@material-ui/core/Grid";

class Home extends Component {
  state = {
    screams: null
  };
  componentDidMount() {
    axios
      .get("/screams")
      .then(res => this.setState({ screams: res.data }))
      .catch(console.log);
  }
  render() {
    let screams = this.state.screams
      ? this.state.screams.map(scream => {
          return <Scream key={scream.screamId} scream={scream} />;
        })
      : "Loding...";
    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          <p>content...</p>
          {screams}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

export default Home;
