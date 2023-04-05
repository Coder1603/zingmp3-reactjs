import {
  faChevronLeft,
  faChevronRight,
  faEllipsisVertical,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import TippyToolTip from "@tippyjs/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { NEW_MUSIC } from "~/untils/homeConst";
import styles from "./Home.module.scss";
import * as apis from "~/apis";
import Button from "~/components/Button/Button";
import * as actions from "~/redux/actions";

const cx = classNames.bind(styles);

function Home() {
  const [dataHome, setDataHome] = useState(null);
  const [translateSlideX, setTranslateSlideX] = useState("0");
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState(0);
  const [sortNewMusic, setSortNewMusic] = useState("all");
  const [indexSong, setIndexSong] = useState(null);

  const dispatch = useDispatch();

  const handleBackTranslteX = () => {
    if (dataHome) {
      translateSlideX < 0
        ? setTranslateSlideX(`${Number(translateSlideX) + 100}`)
        : setTranslateSlideX(`${dataHome.items[0].items.length * -100 + 300}`);
    }
  };

  const handleNextTranslteX = () => {
    if (dataHome) {
      translateSlideX > dataHome.items[0].items.length * -100 + 300
        ? setTranslateSlideX(`${Number(translateSlideX) - 100}`)
        : setTranslateSlideX("0");
    }
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

  // console.log(dataHome);

  return (
    <div className={cx("wrapper")}>
      {/* SLIDE HEADER HOME */}
      <div
        onMouseOver={() => setVisible(true)}
        onMouseOut={() => setVisible(false)}
        className={cx("gallery-container")}
      >
        {dataHome?.items[0].items.map((galleryItem, idx) => (
          <Link
            to={galleryItem.type === 4 ? galleryItem.link : "/"}
            key={idx}
            className={cx("gallery-item")}
            style={{ transform: `translateX(${translateSlideX}%)` }}
            onClick={() => {
              dispatch(actions.setPlaylist({ pid: galleryItem.encodeId }));
            }}
          >
            <img src={galleryItem.banner} alt={galleryItem.encodeId} />
          </Link>
        ))}

        <div className={cx("gallery-btn", { "btn-hover": visible })}>
          <button
            className={cx("back", "btn")}
            onClick={() => handleBackTranslteX()}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className={cx("next", "btn")}
            onClick={() => handleNextTranslteX()}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
      {/* ALBUM RECENLY */}
      {/* <div className={cx("container-section")}>
        <h3 className={cx("title-section")}>Gần Đây</h3>
        <div className={cx("select-recently")}>
          {dataHome?.items[12].items.map((album) => (
            <div className={cx("album")}>
              <img src={album.thumbnail} alt={album.title} />
              <span className={cx("title-recently")}>#zingchart</span>
            </div>
          ))}
        </div>
      </div> */}
      {/* MỚI PHÁT HÀNH */}
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

        <div className={cx("container-musics")}>
          {dataHome?.items[3].items[sortNewMusic].map((music, index) => (
            <div key={index} className={cx("container-colum")}>
              <div
                className={cx("music", {
                  active: indexSong === index,
                })}
                onClick={() => {
                  setIndexSong(index);
                  dispatch(actions.setSongId(music.encodeId));
                }}
              >
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
                <TippyToolTip content="Khác">
                  <div className={cx("three-dot")}>
                    <Button className={cx("btn-icon")}>
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </Button>
                  </div>
                </TippyToolTip>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
