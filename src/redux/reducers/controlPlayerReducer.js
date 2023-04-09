import { actionTypes } from "../actions/actionType";

const initialState = {
  songId: null,
  isShuffling: false,
  isPlaying: false,
  backMusic: null,
  nextMusic: null,
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
    case actionTypes.SET_BACKMUSIC: {
      return {
        ...state,
        backMusic: action.flag || null,
      };
    }
    case actionTypes.SET_NEXTMUSIC: {
      return {
        ...state,
        nextMusic: action.flag || null,
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
        indexSongPlaylist: action.index || 0,
      };
    }
    default:
      return state;
  }
};
export default controlPlayerReducer;
