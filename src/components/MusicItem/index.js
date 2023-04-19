import classNames from "classnames/bind";
import { memo, useCallback, useEffect, useState } from "react";
import TippyToolTip from "@tippyjs/react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./MusicItem.module.scss";
import * as apis from "~/apis";
import Button from "~/components/Button/Button";
import * as actions from "~/redux/actions";
import { BsPauseCircle, BsPlayCircle } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const cx = classNames.bind(styles);

function MusicItem({
  music,
  index,
  time,
  home,
  search,
  sortNewMusic,
  playlistSearch,
}) {
  const [dataHome, setDataHome] = useState(null);

  const dispatch = useDispatch();

  const { songId, isPlaying } = useSelector((state) => state.controlPlayer);

  const handleClickSong = useCallback(
    (music, index) => {
      dispatch(actions.setSongId(music.encodeId));
      dispatch(actions.setIndexSongPlaylist(index));
      dispatch(actions.setPlay(true));
      if (home) {
        dispatch(actions.setPlaylist(dataHome?.items[3].items[sortNewMusic]));
      }
      if (search) {
        dispatch(actions.setPlaylist(playlistSearch));
      }
      if (songId === music.encodeId) {
        dispatch(actions.setPlay(!isPlaying));
      } else {
        dispatch(actions.setPlay(true));
      }
    },
    [
      dataHome,
      isPlaying,
      dispatch,
      songId,
      sortNewMusic,
      home,
      search,
      playlistSearch,
    ]
  );

  useEffect(() => {
    const fetchDataHome = async () => {
      const response = await apis.getHome();
      setDataHome(response.data.data);
    };
    fetchDataHome();
  }, []);

  return (
    <div
      className={cx("music", {
        active: songId === music.encodeId,
        search,
        home,
      })}
      onClick={() => handleClickSong(music, index)}
    >
      <div className={cx("media-left")}>
        <img
          className={cx("media-new-music")}
          src={music.thumbnailM}
          alt={music.title}
        />
        <div className={cx("opacity")}></div>
        <button className={cx("btn-play")}>
          {songId === music.encodeId && isPlaying ? (
            <BsPauseCircle />
          ) : (
            <BsPlayCircle />
          )}
        </button>
      </div>
      <div className={cx("inf")}>
        <h5 className={cx("name-music")}>{music.title}</h5>
        <span>
          {music?.artists?.map((artist, index) => (
            <span className={cx("singer")} key={index}>
              {artist.name}
              {""}
              {index === music.artists.length - 1 ? "" : ", "}
            </span>
          ))}
        </span>
        {time && (
          <span className={cx("time")}>
            {new Date(music.releaseDate * 1000).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        )}
      </div>
      <TippyToolTip content="Khác">
        <div className={cx("three-dot")}>
          <Button className={cx("btn-icon")}>
            <BiDotsHorizontalRounded />
          </Button>
        </div>
      </TippyToolTip>
    </div>
  );
}

export default memo(MusicItem);
