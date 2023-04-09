import albumReducer from "./albumReducer";
// import sidReducer from "./sidReducer";
import controlPlayerReducer from "./controlPlayerReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  // sidReducer: sidReducer,
  album: albumReducer,
  controlPlayer: controlPlayerReducer,
});

export default rootReducer;
