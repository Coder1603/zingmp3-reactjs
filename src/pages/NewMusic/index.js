import { useEffect } from "react";
import AlbumSongList from "~/components/AlbumSongList";
import * as apis from "~/apis";

function NewMusic() {
  useEffect(() => {
    const fetchDataNewMusic = async () => {
      let res = await apis.getHome();
    };
    fetchDataNewMusic();
  }, []);

  return (
    <div>
      <h1>Nhạc mới</h1>
      <AlbumSongList />
    </div>
  );
}

export default NewMusic;
