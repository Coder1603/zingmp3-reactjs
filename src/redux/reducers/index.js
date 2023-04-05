import playlistReducer from "./playlistReducer";
import sidReducer from "./sidReducer";
import controlPlayerReducer from "./controlPlayerReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  sidReducer: sidReducer,
  playlist: playlistReducer,
  controlPlayer: controlPlayerReducer,
});

export default rootReducer;
