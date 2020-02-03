import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  LOADING_UI,
  POST_SCREAM,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_SCREAM,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
  LOADING_USER
} from "../types";

import axios from "axios";

//get all data

export const getScreams = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/screams")
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("data actions", err);
      dispatch({
        type: SET_SCREAMS,
        payload: []
      });
    });
};

// like a scream

export const likeScream = screamId => dispatch => {
  axios
    .post(`/scream/${screamId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data
      });
    })
    .catch(err => console.log("like scream", err));
};

// unlike scream
export const unlikeScream = screamId => dispatch => {
  axios
    .post(`/scream/${screamId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data
      });
    })
    .catch(err => console.log("unlike Scream", err));
};

//delete scream

export const deleteScream = screamId => dispatch => {
  axios
    .delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({ type: DELETE_SCREAM, payload: screamId });
    })
    .catch(err => console.log("delete scream", err));
};

//post scream
export const postScream = newScream => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/scream", newScream)
    .then(res => {
      dispatch({ type: POST_SCREAM, payload: res.data });
    })
    .then(() => {
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};

// get single scream
export const getScream = screamId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/scream/${screamId}`)
    .then(res => {
      dispatch({ type: SET_SCREAM, payload: res.data });
    })
    .then(() => {
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log("getscram", err));
};

//submit comments
export const submitComments = (screamId, commentData) => dispatch => {
  axios
    .post(`/scream/${screamId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

//get user data
export const getUserData = userHandle => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({ type: SET_SCREAMS, payload: res.data.screams });
    })
    .catch(() => {
      dispatch({
        type: SET_SCREAMS,
        payload: null
      });
    });
};
