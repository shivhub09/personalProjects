// fullNameActions.js
import { SET_FULL_NAME_DATA } from './types';

export const setFullNameData = (id, fullName, componentName) => ({
  type: SET_FULL_NAME_DATA,
  payload: {
    uniqueId: id,
    title: fullName,
    type: componentName,
  },
});
