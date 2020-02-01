import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyle from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import CustomButton from "../../utils/CustomButton";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";
import LikeBtn from "./LikeBtn";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat";

const styles = {
  separator: {
    border: "none",
    margin: 4
  },
  profileImg: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover"
  },
  dialogContent: {
    padding: 20
  },
  closeBtn: {
    position: "absolute",
    left: "90%"
  },
  progressContainer: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50
  }
};

class ScreamDialog extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.props.getScream(this.props.screamId);
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle
      },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.progressContainer}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img
            src={userImage}
            alt="user profile"
            className={classes.profileImg}
          />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.separator} />
          <Typography variant="body2" color="secondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.separator} />
          <Typography variant="body1">{body}</Typography>
          <LikeBtn screamId={screamId} />
          <span>{likeCount} likes</span>
          <CustomButton tip="comments">
            <ChatIcon color="primary" />
          </CustomButton>
          <span>{commentCount} comments</span>
        </Grid>
      </Grid>
    );
    return (
      <>
        <CustomButton
          onClick={this.handleOpen}
          tip="Expand Scream"
          tipClass={classes.expandBtn}
        >
          <UnfoldMore color="primary" />
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
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHnadle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  scream: state.data.scream
});

const mapActionsToProps = {
  getScream
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(ScreamDialog));