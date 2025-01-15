import { combineReducers } from "redux";
import phoneNumberReducer from "./reducers/phoneNumberReducer";

const rootReducer = combineReducers({
  phoneNumber: phoneNumberReducer,
  // other reducers
});

export default rootReducer;
