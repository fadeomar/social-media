import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyle from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";

import CustomButton from "../../utils/CustomButton";

//MUI stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const styles = {
  submitBtn: {
    position: "relative",
    marginTop: 20
  },
  progress: {
    position: "absolute"
  },
  closeBtn: {
    position: "absolute",
    left: "90%",
    top: "10%"
  }
};

class PsotScream extends Component {
  state = {
    open: false,
    body: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", errors: {}, open: false });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, errors: {} });
    this.props.clearErrors();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.postScream({ body: this.state.body });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <>
        <CustomButton onClick={this.handleOpen} tip="Post a Scream!">
          <AddIcon />
        </CustomButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <CustomButton
            tip="Close"
            onClick={this.handleClose}
            tipClass={classes.closeBtn}
          >
            <CloseIcon />
          </CustomButton>
          <DialogTitle>Post a new Scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                lable="SCREAM.. ~"
                multiline
                fullWidth
                rows="3"
                placeholder="Scream aat your fellow friends"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
              ></TextField>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitBtn}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = state => ({
  UI: state.UI
});

postScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyle(styles)(PsotScream)
);
