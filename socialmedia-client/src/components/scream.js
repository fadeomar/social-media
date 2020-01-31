import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { connect } from "react-redux";
import { likeScream, unLikeScream } from "../redux/actions/dataActions";

// material ui
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";

import CustomButton from "../utils/CustomButton";
import DeleteScream from "./DeleteScream";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcone from "@material-ui/icons/Favorite";

const styles = {
  card: {
    display: "flex",
    margin: 20,
    position: "relative"
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
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.screamId === this.props.scream.screamId
      )
    ) {
      return true;
    } else return false;
  };

  likeScream = () => {
    console.log("asdasd");
    this.props.likeScream(this.props.scream.screamId);
  };

  unLikeScream = () => {
    this.props.unLikeScream(this.props.scream.screamId);
  };
  render() {
    dayjs.extend(relativeTime);

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
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const likeButton = !authenticated ? (
      <CustomButton tip="like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </CustomButton>
    ) : this.likedScream() ? (
      <CustomButton tip="Undo like" onClick={this.unLikeScream}>
        <FavoriteIcone color="primary" />
      </CustomButton>
    ) : (
      <CustomButton tip="like" onClick={this.likeScream}>
        <FavoriteBorder color="primary" />
      </CustomButton>
    );

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;

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
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createAt).fromNow()}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {body}
          </Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <CustomButton tip="comments">
            <ChatIcon color="primary" />
          </CustomButton>
          <span>{commentCount} comments</span>
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unLikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeScream,
  unLikeScream
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Scream));
