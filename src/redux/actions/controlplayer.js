import { actionTypes } from "./actionType";

export const setSongId = (songId) => ({
  type: actionTypes.SET_SONGID,
  songId,
});

export const setPlay = (flag) => ({
  type: actionTypes.SET_PLAY,
  flag,
});

export const setShuffle = (flag) => ({
  type: actionTypes.SET_SHUFFLE,
  flag,
});

export const setBackMusic = (flag) => ({
  type: actionTypes.SET_BACKMUSIC,
  flag,
});

export const setNextMusic = (flag) => ({
  type: actionTypes.SET_NEXTMUSIC,
  flag,
});

export const setPlaylist = (playlist) => ({
  type: actionTypes.SET_PLAYLIST,
  playlist,
});

export const setIndexSongPlaylist = (index) => ({
  type: actionTypes.SET_INDEXSONGPLAYLIST,
  index,
});
