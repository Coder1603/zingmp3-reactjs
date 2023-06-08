import { useEffect, useState } from "react";
import AlbumSongList from "~/components/AlbumSongList";
import * as apis from "~/apis";
import classNames from "classnames/bind";
import styles from "./NewMusic.module.scss";

const cx = classNames.bind(styles);
function NewMusic() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataNewMusic = async () => {
      let res = await apis.getDetailPlaylist("Z6CZO0F6");
      setData(res.data.data);
    };
    fetchDataNewMusic();
  }, []);

  console.log(data);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header-section")}>
        <h1>BXH Nhạc Mới</h1>
      </div>
      <AlbumSongList album={data} />
    </div>
  );
}

export default NewMusic;
