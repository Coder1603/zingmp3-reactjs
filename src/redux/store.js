import { createStore } from "redux";
import { persistStore } from "redux-persist";

import persistedReducer from "./persistConfig";

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export default store;
export { persistor };
