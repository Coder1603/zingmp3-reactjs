import {
  faChevronLeft,
  faChevronRight,
  faEllipsisVertical,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import { NEW_MUSIC } from "~/untils/homeConst";
import styles from "./Home.module.scss";
import * as apis from "../../apis";

const cx = classNames.bind(styles);

function Home() {
  const [dataHome, setDataHome] = useState(null);
  const [translateSlideX, setTranslateSlideX] = useState("0");
  const [zoomAlbum, setZoomAlbum] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState(0);
  const [sortNewMusic, setSortNewMusic] = useState("all");

  const handleBackTranslteX = () => {
    translateSlideX < 0
      ? setTranslateSlideX(`${Number(translateSlideX) + 100}`)
      : setTranslateSlideX(`${dataHome.items[0].items.length * -100 + 300}`);
  };

  const handleNextTranslteX = () => {
    translateSlideX > dataHome.items[0].items.length * -100 + 300
      ? setTranslateSlideX(`${Number(translateSlideX) - 100}`)
      : setTranslateSlideX("0");
  };

  const handleItemNewMusicClick = (id) => {
    setActiveId(id);

    if (id === 0) {
      setSortNewMusic("all");
    } else if (id === 1) {
      setSortNewMusic("others");
    } else {
      setSortNewMusic("vPop");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextTranslteX();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  });

  useEffect(() => {
    const fetchDataHome = async () => {
      const response = await apis.getHome();

      setDataHome(response.data.data);
    };
    fetchDataHome();
  }, []);
  console.log(dataHome);

  return (
    <div className={cx("wrapper")}>
      {/* SLIDE HEADER HOME */}

      <div
        onMouseOver={() => setVisible(true)}
        onMouseOut={() => setVisible(false)}
        className={cx("gallery-container")}
      >
        {dataHome &&
          dataHome.items[0].items.map((galleryItem, idx) => (
            <div
              key={idx}
              className={cx("gallery-item")}
              style={{ transform: `translateX(${translateSlideX}%)` }}
            >
              <img src={galleryItem.banner} alt={galleryItem.encodeId} />
            </div>
          ))}

        <div className={cx("gallery-btn", { "btn-hover": visible })}>
          <button
            className={cx(" back", "btn")}
            onClick={() => handleBackTranslteX()}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className={cx(" next", "btn")}
            onClick={() => handleNextTranslteX()}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      {/* ALBUM XEM GẦN Đây */}

      <div className={cx("container-section")}>
        <h3 className={cx("title-section")}>Gần Đây</h3>
        <div className={cx("select-recently")}>
          <div
            onMouseOver={() => setZoomAlbum(true)}
            onMouseOut={() => setZoomAlbum(false)}
            className={cx("album")}
          >
            <img
              src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/e/d/2/5/ed251cf560be4747e7737b535c357f07.jpg"
              alt=""
            />
            <span className={cx("title-recently")}>#zingchart</span>
          </div>
          <div className={cx("album")}>
            <img
              src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/e/d/2/5/ed251cf560be4747e7737b535c357f07.jpg"
              alt=""
            />
            <span className={cx("title-recently")}>#zingchart</span>
          </div>
        </div>
      </div>
      <div className={cx("container-section")}>
        <span className={cx("title-section")}>Mới Phát Hành</span>
        <div className={cx("nav-new")}>
          {NEW_MUSIC.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleItemNewMusicClick(item.id)}
              className={cx("nav-btn", { active: item.id === activeId })}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* MỚI PHÁT HÀNH */}

        <div className={cx("container-musics")}>
          {dataHome &&
            dataHome.items[3].items[sortNewMusic].map((music, index) => (
              <div key={index} className={cx("container-colum")}>
                <div className={cx("music")}>
                  <div className={cx("img-music")}>
                    <img src={music.thumbnail} alt={music.title} />
                    <div className={cx("opacity")}></div>
                    <button className={cx("btn-play")}>
                      <FontAwesomeIcon icon={faPlay} />
                    </button>
                  </div>
                  <div className={cx("inf")}>
                    <h5 className={cx("name-music")}>{music.title}</h5>
                    <span className={cx("singer")}>{music.artistsNames}</span>
                    <span className={cx("time")}>Hôm qua</span>
                  </div>
                  <button className={cx("btn-more")}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
