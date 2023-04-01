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

const cx = classNames.bind(styles);

function Album() {
  const currentPid = useSelector((state) => state.playlist.pid);

  const dispatch = useDispatch();

  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchDataHome = async () => {
      const response = await apis.getDetailPlaylist(currentPid);
      setPlaylist(response.data.data);
    };
    fetchDataHome();
  }, []);

  console.log(currentPid);
  console.log(playlist);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("playlist-header")}>
        <div className={cx("header-media")}>
          <img src={playlist ? playlist.thumbnailM : ""} alt="" />
        </div>
        <div className={cx("header-content")}>
          <h3 className={cx("album-title")}>
            {playlist ? playlist.title : ""}
          </h3>
          <span className={cx("album-artists")}>
            {playlist
              ? playlist.artists.map((artist, index) => (
                  <span key={index}>
                    {artist.name}{" "}
                    {index === playlist.artists.length - 1 ? "" : ", "}
                  </span>
                ))
              : ""}
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
          <span>{playlist ? playlist.description : ""}</span>
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
            {playlist
              ? playlist.song.items.map((item, index) => (
                  <div
                    key={index}
                    className={cx("song-item")}
                    onClick={() => {
                      dispatch(actions.setPlaslistId(item.encodeId));
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
                        <span> {item.album ? item.album.title : ""}</span>
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
                ))
              : ""}
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
        {/* <div className={cx("related-albums")}>
          <h3 className={cx("title")}>Có Thể Bạn Quan Tâm</h3>
          <div className={cx("albums-container")}>
            <div className={cx("albums")}>

            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Album;