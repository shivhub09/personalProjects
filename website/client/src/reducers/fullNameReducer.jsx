// fullNameReducer.js
import {
  SET_FULL_NAME_DATA,
  RESET_FULL_NAME_DATA
} from '../pages/users/admin/pages/AdminCreateForm/FormUtils/elements/FormFields/actions/types';

const initialState = {
  fullNameDataList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FULL_NAME_DATA:
      // Check if the item already exists in the list
      const existingIndex = state.fullNameDataList.findIndex(item => item.uniqueId === action.payload.uniqueId);

      if (existingIndex !== -1) {
        // If item exists, update it in the list
        const updatedList = [...state.fullNameDataList];
        updatedList[existingIndex] = action.payload;
        return {
          ...state,
          fullNameDataList: updatedList,
        };
      } else {
        // If item doesn't exist, add it to the list
        return {
          ...state,
          fullNameDataList: [...state.fullNameDataList, action.payload],
        };
      }

    case RESET_FULL_NAME_DATA:
      // Reset the fullNameDataList to its initial state
      return {
        ...state,
        fullNameDataList: [],
      };

    default:
      return state;
  }
}
