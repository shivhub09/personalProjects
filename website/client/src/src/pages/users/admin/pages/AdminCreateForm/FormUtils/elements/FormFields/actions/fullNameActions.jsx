// fullNameActions.js
import { SET_FULL_NAME_DATA } from './types';

export  const setFullNameData = (id, fullName, componentName, options) => {
  console.log({ id, fullName, componentName, options });
  return {
    type: SET_FULL_NAME_DATA,
    payload: {
      uniqueId: id,
      title: fullName,
      type: componentName,
      options:options
    },
  };
};

