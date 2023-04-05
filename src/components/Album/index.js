import classNames from "classnames/bind";
import { useEffect, useState } from "react";
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

const cx = classNames.bind(styles);

function Album() {
  const dispatch = useDispatch();

  const currentPlaylist = useSelector((state) => state.playlist.pid);
  const controlPlayer = useSelector((state) => {
    return state.controlPlayer;
  });

  const [playlist, setPlaylist] = useState(null);
  const [indexSong, setIndexSong] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [currentPid, setCurrentPid] = useState(currentPlaylist);

  useEffect(() => {
    const fetchDataHome = async () => {
      const [res1, res2] = await Promise.all([
        apis.getDetailPlaylist(currentPid),
        apis.getHome(),
      ]);
      setPlaylist(res1.data.data);
      setAlbums(res2.data.data.items[10]);
    };
    fetchDataHome();
  }, [currentPid]);

  useEffect(() => {
    if (controlPlayer.isShuffling) {
      let randomIndex = Math.floor(Math.random() * playlist?.song.items.length);

      dispatch(
        actions.setPlaylist({
          sid: playlist?.song.items[randomIndex].encodeId,
        })
      );

      setIndexSong(randomIndex);
    } else {
      if (controlPlayer.isNext) {
        setIndexSong(indexSong + 1);
        if (indexSong < playlist?.song.items.length - 1) {
          dispatch(
            actions.setPlaylist({
              sid: playlist?.song.items[indexSong + 1].encodeId,
            })
          );
        } else {
          dispatch(
            actions.setPlaylist({ sid: playlist?.song.items[0].encodeId })
          );
          setIndexSong(0);
        }
      }

      if (controlPlayer.isBack) {
        setIndexSong(indexSong - 1);
        if (indexSong > 0) {
          dispatch(
            actions.setPlaylist({
              sid: playlist?.song.items[indexSong - 1].encodeId,
            })
          );
        } else {
          dispatch(
            actions.setPlaylist({
              sid: playlist?.song.items[playlist?.song.items.length - 1]
                .encodeId,
            })
          );
          setIndexSong(playlist?.song.items.length - 1);
        }
      }
    }
  }, [controlPlayer]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container-top")}>
        <div className={cx("playlist-header")}>
          <div className={cx("header-media")}>
            <img src={playlist?.thumbnailM} alt="" />
          </div>
          <div className={cx("header-content")}>
            <h3 className={cx("album-title")}>{playlist?.title}</h3>
            <span className={cx("album-artists")}>
              {playlist?.artists.map((artist, index) => (
                <span key={index}>
                  {artist.name}{" "}
                  {index === playlist.artists.length - 1 ? "" : ", "}
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
            <span>{playlist?.description}</span>
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
            <div className={cx("list-songs")}>
              {playlist?.song.items.map((item, index) => (
                <div
                  key={index}
                  className={cx("song-item", {
                    active: indexSong === index,
                  })}
                  onClick={() => {
                    setIndexSong(index);
                    dispatch(actions.setPlaylist({ sid: item.encodeId }));
                  }}
                >
                  <div className={cx("media-left")}>
                    <IoMusicalNotesOutline className={cx("icon-music")} />
                    <div className={cx("media-img")}>
                      <img src={item.thumbnail} alt="" />
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
              <span>{playlist && `${playlist.song.total} bài hát`}</span>•
              <span>
                {playlist &&
                  `${Math.floor(playlist.song.totalDuration / 60)} phút ${
                    playlist.song.totalDuration % 60
                  } giây`}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("related-albums")}>
        <h3 className={cx("title")}>Có Thể Bạn Quan Tâm</h3>
        <div className={cx("albums-container")}>
          <div className={cx("albums")}>
            {albums &&
              albums.items.map((album, index) => (
                <div key={index} className={cx("album")}>
                  <Link
                    className={cx("media-album")}
                    onClick={() => {
                      setCurrentPid(album.encodeId);
                      window.scrollTo(0, 0);
                    }}
                    to={album.link}
                  >
                    <img src={album.thumbnailM} alt="{album.title}" />
                  </Link>
                  <div className={cx("inf-album")}>
                    <div className={cx("title-album")}>{album.title}</div>
                    <div className={cx("artists-album")}>
                      {album.artists.map((artist, index) => (
                        <span key={index}>
                          {artist.name}{" "}
                          {index === album.artists.length - 1 ? "" : ", "}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Album;
