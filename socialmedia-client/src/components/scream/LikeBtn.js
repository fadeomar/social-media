import React, { Component } from "react";
import CustomButton from "../../utils/CustomButton";
import PropTypes from "prop-types";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcone from "@material-ui/icons/Favorite";
import { connect } from "react-redux";
import { likeScream, unLikeScream } from "../../redux/actions/dataActions";
import { Link } from "react-router-dom";

export class LikeBtn extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.screamId === this.props.screamId)
    ) {
      return true;
    } else return false;
  };

  likeScream = () => {
    this.props.likeScream(this.props.screamId);
  };

  unLikeScream = () => {
    this.props.unLikeScream(this.props.screamId);
  };

  render() {
    const { authenticated } = this.props.user;
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
    return likeButton;
  }
}
LikeBtn.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unLikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
};

const mapActionsToProps = {
  likeScream,
  unLikeScream
};

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps, mapActionsToProps)(LikeBtn);
