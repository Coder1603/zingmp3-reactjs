import { actionTypes } from "../actions/actionType";

const initialState = {
  sid: null,
  pid: null,
};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PLAYLISTID: {
      return {
        ...state,
        pid: action.payload || null,
        sid: action.payload || null,
      };
    }
    default:
      return state;
  }
};
export default playlistReducer;
