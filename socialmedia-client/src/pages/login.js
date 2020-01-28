import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MonkyImg from "../images/monky.png";
import axios from "axios";

// MUi
import Grid from "@material-ui/core/Grid";
import { Typography, TextField, Button, Link } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  form: {
    textAlign: "center"
  },
  img: {
    width: 75,
    margin: `20px auto`
  },
  textField: {
    margin: `20px auto`
  },
  button: {
    margin: `20px auto`,
    position: "relative"
  },
  errorsCustom: {
    color: "red",
    fontSize: "0.8rem",
    maginTop: "50px"
  },
  progress: {
    position: "absolute"
  }
};

class Login extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
    errors: {}
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: !this.state.loading });
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post(`/login`, userData)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        this.setState({ loading: !this.state.loading });
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({
          errors: err.response.data,
          loading: !this.state.loading
        });
      });
  };
  handleChange = e => {
    // console.log("change");
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { classes } = this.props;
    const { loading, errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <img src={MonkyImg} alt="Monky" className={classes.img} />
          <Typography variant="h2" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              helperText={errors.password}
              error={errors.password ? true : false}
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.errorsCustom}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading ? true : false}
            >
              LOGIN
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              dont have an acount ? sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
