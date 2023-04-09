import { actionTypes } from "../actions/actionType";

const initialState = {
  albumId: null,
};

const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALBUMID: {
      return {
        ...state,
        albumId: action.albumId || null,
      };
    }
    default:
      return state;
  }
};
export default albumReducer;
