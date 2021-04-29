import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import voteReducer from "./voteReducers";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  vote:voteReducer
});