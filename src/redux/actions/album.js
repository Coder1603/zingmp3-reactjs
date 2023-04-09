import { actionTypes } from "./actionType";

export const setAlbumId = (albumId) => ({
  type: actionTypes.SET_ALBUMID,
  albumId,
});
