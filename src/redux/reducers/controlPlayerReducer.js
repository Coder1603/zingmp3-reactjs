import { actionTypes } from "../actions/actionType";

const initialState = {
  isNext: null,
  isBack: null,
  isShuffling: false,
};

const controlPlayerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CONTROLPLAYER: {
      return {
        isNext: action.payload.isNext || null,
        isBack: action.payload.isBack || null,
        isShuffling: action.payload.isShuffling || false,
      };
    }
    default:
      return state;
  }
};
export default controlPlayerReducer;
