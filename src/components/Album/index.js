import classNames from "classnames/bind";
import { memo, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { BiSortAlt2 } from "react-icons/bi";
import { useSelector } from "react-redux";

import styles from "./Album.module.scss";
import * as apis from "~/apis";
import Button from "../Button/Button";
import SectionPlaylist from "../SectionPlaylist";
import AlbumSongList from "../AlbumSongList";

const cx = classNames.bind(styles);

function Album() {
  const { albumId } = useSelector((state) => state.album);

  const [album, setAlbum] = useState(null);
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    const fetchDataHome = async () => {
      const [res1, res2] = await Promise.all([
        apis.getDetailPlaylist(albumId),
        apis.getHome(),
      ]);
      setAlbum(res1.data.data);
      setAlbums(res2.data.data.items[11]);
    };
    fetchDataHome();
  }, [albumId]);

  useEffect(() => {
    if (album) {
      document.title = `${album.title} | Album 320 lossless`;
    }
  }, [album]);

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
              <div className={cx("actions")}>
                <button className={cx("play-playlist")}>PHÁT NGẪU NHIÊN</button>
                <Button album className={cx("btn-icon")}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </Button>
              </div>
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

              <AlbumSongList album={album} />
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
