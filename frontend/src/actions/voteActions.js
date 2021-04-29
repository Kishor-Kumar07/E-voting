import {
    SET_VOTE
  } from "./types";

  export const updateVote = (userData) => dispatch => {
    
        dispatch({
          type: SET_VOTE,
          payload: userData
        })
      
  };