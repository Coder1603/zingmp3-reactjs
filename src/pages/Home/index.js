import classNames from "classnames/bind";
import { memo, useEffect, useState } from "react";

import styles from "./Home.module.scss";
import * as apis from "~/apis";
import GallerySlides from "~/components/GallerySlides";
import NewMusicLists from "~/components/NewMusicLists";
import SectionPlaylist from "~/components/SectionPlaylist";
import BhxMusics from "~/components/BhxMusics";
import Chart from "~/components/Chart";

const cx = classNames.bind(styles);

function Home() {
  const [dataHome, setDataHome] = useState(null);

  useEffect(() => {
    const fetchDataHome = async () => {
      const response = await apis.getHome();
      setDataHome(response.data.data);
    };
    fetchDataHome();
  }, []);

  // console.log("re-render-home");

  return (
    dataHome && (
      <div className={cx("wrapper")}>
        {/* SLIDE HEADER HOME */}
        <GallerySlides data={dataHome.items[0]} />
        {/* MỚI PHÁT HÀNH */}
        <NewMusicLists data={dataHome.items[3]} />
        {/*  Chill */}
        <SectionPlaylist data={dataHome.items[4]} />
        {/*   Focus */}
        <SectionPlaylist data={dataHome.items[5]} />
        {/*    Nghệ Sĩ Thịnh Hành  */}
        <SectionPlaylist data={dataHome.items[6]} />
        {/*  BXH Nhạc Mới   */}
        <BhxMusics data={dataHome.items[7]} />
        {/*  Chart*/}
        <Chart />
        {/*  Top 100 */}
        <SectionPlaylist data={dataHome.items[10]} />
        {/*  Album hot */}
        <SectionPlaylist data={dataHome.items[11]} />
      </div>
    )
  );
}

export default memo(Home);
