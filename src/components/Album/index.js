import classNames from "classnames/bind";
import { memo, useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Album.module.scss";
import * as apis from "~/apis";
import Button from "../Button/Button";
import * as actions from "~/redux/actions";
import { Link } from "react-router-dom";
import { BsPauseCircle, BsPlayCircle } from "react-icons/bs";
import SectionPlaylist from "../SectionPlaylist";

const cx = classNames.bind(styles);

function Album() {
  const dispatch = useDispatch();

  const { albumId } = useSelector((state) => state.album);
  const { songId, isPlaying } = useSelector((state) => state.controlPlayer);

  const [album, setAlbum] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [currentPid, setCurrentPid] = useState(albumId);

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

  useEffect(() => {
    const fetchDataHome = async () => {
      const [res1, res2] = await Promise.all([
        apis.getDetailPlaylist(currentPid),
        apis.getHome(),
      ]);
      setAlbum(res1.data.data);
      setAlbums(res2.data.data.items[11]);
    };
    fetchDataHome();
  }, [currentPid]);

  useEffect(() => {
    if (album) {
      document.title = `${album.title} | Album 320 lossless`;
    }
  }, [album]);
  // console.log(album);
  // console.log("re-render-album");

  return (
    album &&
    albums && (
      <div className={cx("wrapper")}>
        <div className={cx("container-top")}>
          <div className={cx("playlist-header")}>
            <div className={cx("header-media")}>
              <img src={album.thumbnailM} alt="" />
            </div>
            <div className={cx("header-content")}>
              <h3 className={cx("album-title")}>{album.title}</h3>
              <span className={cx("album-artists")}>
                {album.artists.map((artist, index) => (
                  <span key={index}>
                    {artist.name}{" "}
                    {index === album.artists.length - 1 ? "" : ", "}
                  </span>
                ))}
              </span>
              <button className={cx("play-playlist")}>PHÁT NGẪU NHIÊN</button>
              <Button album className={cx("btn-icon")}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </Button>
            </div>
          </div>
          <div className={cx("playlist-content")}>
            <div className={cx("content-description")}>
              <span className={cx("description-fixed")}>Lời tựa </span>
              <span>{album.description}</span>
            </div>
            <div className={cx("content-list")}>
              <div className={cx("list-header")}>
                <div className={cx("media-left")}>
                  <BiSortAlt2 className={cx("icon-music")} />
                  <div className={cx("colum-text")}>BÀI HÁT</div>
                </div>
                <div className={cx("media-center")}>
                  <div className={cx("colum-text")}>ALBUM</div>
                </div>
                <div className={cx("media-right")}>
                  <div className={cx("colum-text")}>THỜI GIAN</div>
                </div>
              </div>
              <div className={cx("song-list")}>
                {album.song.items.map((item, index) => (
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
                        <div className={cx("artist-song")}>
                          {item.artistsNames}
                        </div>
                      </div>
                    </div>
                    <div className={cx("media-center")}>
                      <div className={cx("album-name")}>
                        <span> {item.album?.title}</span>
                      </div>
                    </div>
                    <div className={cx("media-right")}>
                      <span className={cx("duration")}>{`${Math.floor(
                        item.duration / 60
                      )
                        .toString()
                        .padStart(2, "0")}:${(item.duration % 60)
                        .toString()
                        .padStart(2, "0")}`}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={cx("content-subtitle")}>
                <span>{album && `${album.song.total} bài hát`}</span>•
                <span>
                  {album &&
                    `${Math.floor(album.song.totalDuration / (60 * 60))} giờ ${
                      Math.floor(album.song.totalDuration / 60) % 60
                    } phút`}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Bài hát liên quan */}
        <SectionPlaylist data={albums} />
      </div>
    )
  );
}

export default memo(Album);
