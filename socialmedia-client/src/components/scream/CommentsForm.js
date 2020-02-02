import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyle from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { connect } from "react-redux";
import { submitComments } from "../../redux/actions/dataActions";
import { Button } from "@material-ui/core";

const styles = {
  textField: {
    width: "90%"
  },
  button: {
    marginTop: 20
  }
};

class CommentForm extends Component {
  state = {
    body: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.submitComments(this.props.screamId, { body: this.state.body });
    this.setState({ body: "" });
  };
  render() {
    const { classes, authenticated } = this.props;
    const { errors } = this.state;

    return authenticated ? (
      <Grid item sm={12} style={{ textAlign: "center", marginTop: 20 }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="comment on scream"
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        <hr className={classes.visibleSeparator} />
      </Grid>
    ) : null;
  }
}

CommentForm.propTypes = {
  submitComments: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  Classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { submitComments })(
  withStyle(styles)(CommentForm)
);
