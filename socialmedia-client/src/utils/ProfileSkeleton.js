import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import NoImage from "../images/no-image.jpeg";
import PropTypes from "prop-types";

import { Button, Paper, Link as MuLink, Typography } from "@material-ui/core";
import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday,
  Edit as EditIcon,
  KeyboardReturn
} from "@material-ui/icons";

const ProfileSkeleton = props => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className={classes.imageWrapper}>
          <img src={NoImage} alt="profile" className={classes.profileImage} />
        </div>
        <hr className={classes.profileHr} />
        <div className={classes.profileDetails}>
          <div className={classes.handle}></div>
          <hr className={classes.profileHr} />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr className={classes.profileHr} />
          <LocationOn color="primary" /> <span>Location</span>
          <hr className={classes.profileHr} />
          <LinkIcon color="primary" /> <span>https://website.com</span>
          <hr className={classes.profileHr} />
          <CalendarToday color="primary" /> <span>Joined date</span>
        </div>
      </div>
    </Paper>
  );
};

const styles = {
  fullLine: {
    height: 15,
    width: "100%",
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  halfLine: {
    height: 15,
    width: "50%",
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  handle: {
    width: 60,
    height: 20,
    backgroundColor: "#00bcd4",
    margin: "0 auto 7px auto"
  },
  paper: {
    padding: 20
  },
  imageWrapper: {
    textAlign: "center",
    position: "relative "
  },
  profileButton: {
    position: "absolute",
    top: "80%",
    left: "80%"
  },
  profileImage: {
    width: 200,
    height: 200,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%"
  },
  profileDetails: {
    textAlign: "center"
  },
  profileSpan: {
    verticalAlign: "middle"
  },
  profileSvg: {
    verticalAlign: "middle"
  },
  profileA: {
    color: "blue"
  },
  profileHr: {
    border: "none",
    margin: "0 0 10px 0"
  },

  profile: {
    "profile svg.button": {
      "profile hover": {
        cursor: "pointer"
      }
    }
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  }
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ProfileSkeleton);
