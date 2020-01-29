import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyle from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { connect } from "react-redux";
import { uploadImage, logoutUser } from "../redux/actions/userActions";

//MUI stuff
import {
  Button,
  Paper,
  Link as MuLink,
  Typography,
  IconButton,
  Tooltip
} from "@material-ui/core";
import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday,
  Edit as EditIcon,
  KeyboardReturn
} from "@material-ui/icons";
import { red } from "@material-ui/core/colors";
// import LocationOn from "@material-ui/icons/LocationOn";

//Icons
const styles = {
  paper: {
    padding: 20
  },
  imageWrapper: {
    textAlign: "center",
    position: "relative ",
    backgroundColor: red
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

export class Profile extends Component {
  handleImageChange = e => {
    const image = e.target.files[0];
    // server
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };

  handleEditImage = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated
      }
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.Profile}>
            <div className={classes.imageWrapper}>
              <img
                src={imageUrl}
                alt="profile"
                className={classes.profileImage}
              />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <Tooltip title="Edit profile picture" placement="top">
                <IconButton
                  onClick={this.handleEditImage}
                  className={classes.profileButton}
                >
                  <EditIcon color="primary" />
                </IconButton>
              </Tooltip>
            </div>
            <hr className={classes.profileHr} />
            <div className={classes.profileDetails}>
              <MuLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </MuLink>
              <hr className={classes.profileHr} />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr className={classes.profileHr} />
              {location && (
                <>
                  <LocationOn color="primary" className={classes.profileSvg} />
                  <span className={classes.profileSpan}>{location}</span>
                  <hr className={classes.profileHr} />
                </>
              )}
              {website && (
                <>
                  <LinkIcon color="primary" className={classes.profileSvg} />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>
                  <hr className={classes.profileHr} />
                </>
              )}
              <CalendarToday color="primary" className={classes.profileSvg} />{" "}
              <span className={classes.profileSpan}>
                {" "}
                Joined {dayjs(createdAt).format("MMM YYYY")}
              </span>
            </div>
            <Tooltip title="Logout" placement="top">
              <IconButton onClick={this.handleLogout}>
                <KeyboardReturn color="primary" />
              </IconButton>
            </Tooltip>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found please login again
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              LOGIN
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              SIGNUP
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <p>...loading</p>
    );
    return profileMarkup;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  calsses: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(Profile));
