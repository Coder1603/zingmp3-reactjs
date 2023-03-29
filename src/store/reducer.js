import { SET_ENCODEID } from "./constants";

const initState = {
  encodeId: "",
};

function reducer(state, action) {
  switch (action.type) {
    case SET_ENCODEID: {
      return action.payload;
    }
    default:
      throw new Error("Invalid action");
  }
}

export { initState };
export default reducer;
