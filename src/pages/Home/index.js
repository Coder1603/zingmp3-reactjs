import classNames from "classnames/bind";
import { memo, useEffect, useState } from "react";

import styles from "./Home.module.scss";
import * as apis from "~/apis";
import GallerySlides from "~/components/GallerySlides";
import NewMusicLists from "~/components/NewMusicLists";
import SectionPlaylist from "~/components/SectionPlaylist";
import BhxMusics from "~/components/BhxMusics";
import Chart from "~/components/Chart";
import BannerHome from "~/components/BannerHome";
import RadioSection from "~/components/RadioSection";

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

  useEffect(() => {
    document.title =
      "Zing MP3 | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV";
  }, []);
  // console.log("re-render-home");

  return (
    dataHome && (
      <div className={cx("wrapper")}>
        {/* SLIDE HEADER HOME */}
        <GallerySlides data={dataHome.items[0]} />
        {/* MỚI PHÁT HÀNH */}
        <NewMusicLists data={dataHome.items[2]} />
        {/*  Section */}
        <SectionPlaylist data={dataHome.items[3]} />
        <SectionPlaylist data={dataHome.items[4]} />
        <SectionPlaylist data={dataHome.items[5]} />
        {/*  BXH */}
        <BhxMusics data={dataHome.items[6]} />
        {/*  Chart*/}
        <Chart />
        {/* Banner */}
        <BannerHome data={dataHome.items[8]} />
        {/*  Section*/}
        <SectionPlaylist data={dataHome.items[9]} />
        <SectionPlaylist data={dataHome.items[10]} />
        <RadioSection data={dataHome.items[11]} />
        <div></div>
      </div>
    )
  );
}

export default memo(Home);
