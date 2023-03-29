import { useReducer } from "react";
import Context from "./Context";

import reducer, { initState } from "./reducer";

function Provider({ children }) {
  const [curSongId, dispatch] = useReducer(reducer, initState);

  return (
    <Context.Provider value={[curSongId, dispatch]}>
      {children}
    </Context.Provider>
  );
}

export default Provider;
