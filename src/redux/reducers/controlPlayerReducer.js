import { actionTypes } from "../actions/actionType";

const initialState = {
  songId: null,
  isShuffling: false,
  isPlaying: false,
  playList: null,
  indexSong: 0,
};

const controlPlayerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SONGID: {
      return {
        ...state,
        songId: action.songId || state.songId,
      };
    }
    case actionTypes.SET_PLAY: {
      return {
        ...state,
        isPlaying: action.flag || false,
      };
    }
    case actionTypes.SET_SHUFFLE: {
      return {
        ...state,
        isShuffling: action.flag || false,
      };
    }
    case actionTypes.SET_PLAYLIST: {
      return {
        ...state,
        playlist: action.playlist || state.playlist,
      };
    }
    case actionTypes.SET_INDEXSONGPLAYLIST: {
      return {
        ...state,
        indexSong: action.indexSong || 0,
      };
    }
    default:
      return state;
  }
};
export default controlPlayerReducer;
