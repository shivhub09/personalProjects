// index.js or rootReducer.js
import { combineReducers } from 'redux';
import fullNameReducer from './fullNameReducer';

const rootReducer = combineReducers({
  fullName: fullNameReducer,
  // Add other reducers here if needed
});

export default rootReducer;
