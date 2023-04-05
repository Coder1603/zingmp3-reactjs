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
        pid: action.payload.pid || null,
        sid: action.payload.sid || state.sid,
      };
    }
    default:
      return state;
  }
};
export default playlistReducer;
