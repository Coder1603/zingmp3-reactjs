import playlistReducer from "./playlistReducer";
import sidReducer from "./sidReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  sidReducer: sidReducer,
  playlist: playlistReducer,
});

export default rootReducer;
