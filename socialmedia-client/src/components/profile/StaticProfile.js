import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MuLink from "@material-ui/core/Link";

import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday
} from "@material-ui/icons";

const styles = {
  paper: {
    padding: 20
  },
  imageWrapper: {
    textAlign: "center",
    position: "relative "
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
  }
};

const StaticProfile = props => {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, website, location, bio }
  } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.Profile}>
        <div className={classes.imageWrapper}>
          <img src={imageUrl} alt="profile" className={classes.profileImage} />
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
      </div>
    </Paper>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(StaticProfile);
