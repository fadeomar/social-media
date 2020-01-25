import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

// material ui
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { width } from "@material-ui/system";

const styles = {
  card: {
    display: "flex",
    margin: 20
  },
  image: {
    minWidth: 200
  },
  contnet: {
    padding: 25,
    objectFit: "conver"
  }
};

class Scream extends Component {
  render() {
    const {
      classes,
      scream: {
        userImage,
        createAt,
        userHandle,
        screamId,
        likeCount,
        commentCount,
        body
      }
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.contnet}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {createAt}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {body}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Scream);
