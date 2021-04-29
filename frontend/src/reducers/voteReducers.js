import {
    SET_VOTE
  } from "../actions/types";
  const initialState = {
    president:{},
    vicepresident:{},
    gensec:{}
  };

  function voteReducer(state = initialState, action) {
    switch (action.type) { 
      
      case SET_VOTE:
        return {
          ...state,
          [action.payload.id]:action.payload.user
        };
      default:
        return state;
    }
  }
  export default voteReducer;