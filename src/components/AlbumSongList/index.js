import { BsPauseCircle, BsPlayCircle } from "react-icons/bs";
import { IoMusicalNotesOutline } from "react-icons/io5";
import classNames from "classnames/bind";
import styles from "./AlbumSongList.module.scss";
import { memo, useCallback } from "react";
import * as actions from "~/redux/actions";
import { useDispatch, useSelector } from "react-redux";

const cx = classNames.bind(styles);

function AlbumSongList({ album }) {
  console.log(album);
  const dispatch = useDispatch();
  const { songId, isPlaying } = useSelector((state) => state.controlPlayer);

  const handleClickSong = useCallback(
    (item, index) => {
      dispatch(actions.setSongId(item.encodeId));
      dispatch(actions.setIndexSongPlaylist(index));
      dispatch(actions.setPlaylist(album.song.items));
      if (songId === item.encodeId) {
        dispatch(actions.setPlay(!isPlaying));
      } else {
        dispatch(actions.setPlay(true));
      }
    },
    [dispatch, album, songId, isPlaying]
  );

  return (
    <div className={cx("wrapper")}>
      {album?.song.items.map((item, index) => (
        <div
          key={index}
          className={cx("song-item", `song-${item.encodeId}`, {
            active: songId === item.encodeId,
          })}
          onClick={() => handleClickSong(item, index)}
        >
          <div className={cx("media-left")}>
            <IoMusicalNotesOutline className={cx("icon-music")} />
            <div className={cx("media-img")}>
              <img src={item.thumbnail} alt="" />
              <button className={cx("btn-play")}>
                {songId === item.encodeId && isPlaying ? (
                  <BsPauseCircle />
                ) : (
                  <BsPlayCircle />
                )}
              </button>
            </div>
            <div className={cx("inf-song")}>
              <div className={cx("title-song")}>
                <span>{item.title}</span>
              </div>
              <div className={cx("artist-song")}>{item.artistsNames}</div>
            </div>
          </div>
          <div className={cx("media-center")}>
            <div className={cx("album-name")}>
              <span> {item.album?.title}</span>
            </div>
          </div>
          <div className={cx("media-right")}>
            <span className={cx("duration")}>{`${Math.floor(item.duration / 60)
              .toString()
              .padStart(2, "0")}:${(item.duration % 60)
              .toString()
              .padStart(2, "0")}`}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(AlbumSongList);
