import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { memo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { NEW_MUSIC } from "~/untils/homeConst";
import styles from "./Home.module.scss";
import * as apis from "~/apis";
import * as actions from "~/redux/actions";
import { BsPlayCircle } from "react-icons/bs";
import { GrNext } from "react-icons/gr";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MusicItem from "~/components/MusicItem";

const cx = classNames.bind(styles);

function Home() {
  const [dataHome, setDataHome] = useState(null);
  const [translateSlideXGallery, setTranslateSlideXGallery] = useState("0");
  const [translateSlideXBxh, setTranslateSlideXBxh] = useState("0");
  const [activeId, setActiveId] = useState(0);
  const [sortNewMusic, setSortNewMusic] = useState("all");

  const dispatch = useDispatch();

  const handleBackTranslteXGallery = useCallback(() => {
    if (dataHome) {
      translateSlideXGallery < 0
        ? setTranslateSlideXGallery(`${Number(translateSlideXGallery) + 100}`)
        : setTranslateSlideXGallery(
            `${dataHome.items[0].items.length * -100 + 300}`
          );
    }
  }, [dataHome, translateSlideXGallery]);

  const handleNextTranslteXGallery = useCallback(() => {
    if (dataHome) {
      translateSlideXGallery > dataHome.items[0].items.length * -100 + 300
        ? setTranslateSlideXGallery(`${Number(translateSlideXGallery) - 100}`)
        : setTranslateSlideXGallery("0");
    }
  }, [dataHome, translateSlideXGallery]);

  const handleBackTranslteXBxh = useCallback(() => {
    if (dataHome) {
      translateSlideXBxh < 0
        ? setTranslateSlideXBxh(`${Number(translateSlideXBxh) + 100}`)
        : setTranslateSlideXBxh(
            `${(dataHome.items[7].items.length + 1) * -100 + 300}`
          );
    }
  }, [dataHome, translateSlideXBxh]);

  const handleNextTranslteXBxh = useCallback(() => {
    if (dataHome) {
      translateSlideXBxh > (dataHome.items[7].items.length + 1) * -100 + 300
        ? setTranslateSlideXBxh(`${Number(translateSlideXBxh) - 100}`)
        : setTranslateSlideXBxh("0");
    }
  }, [dataHome, translateSlideXBxh]);

  const handleItemNewMusicClick = useCallback((id) => {
    setActiveId(id);
    if (id === 0) {
      setSortNewMusic("all");
    } else if (id === 1) {
      setSortNewMusic("others");
    } else {
      setSortNewMusic("vPop");
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextTranslteXGallery();
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

  // console.log("re-render-home");

  return (
    dataHome && (
      <div className={cx("wrapper")}>
        {/* SLIDE HEADER HOME */}

        <div className={cx("container-content", "gallery-container")}>
          {dataHome.items[0].items.map((galleryItem, idx) => (
            <Link
              to={galleryItem.type === 4 ? galleryItem.link : "/"}
              key={idx}
              className={cx("gallery-item")}
              style={{ transform: `translateX(${translateSlideXGallery}%)` }}
              onClick={() => {
                dispatch(actions.setAlbumId(galleryItem.encodeId));
              }}
            >
              <img src={galleryItem.banner} alt={galleryItem.encodeId} />
            </Link>
          ))}

          <div className={cx("gallery-btn")}>
            <button
              className={cx("back", "navigation-btn")}
              onClick={() => handleBackTranslteXGallery()}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              className={cx("next", "navigation-btn")}
              onClick={() => handleNextTranslteXGallery()}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
        {/* ALBUM RECENLY */}
        {/* <div className={cx("container-section")}>
        <h3 className={cx("title-section")}>Gần Đây</h3>
        <div className={cx("select-recently")}>
          {dataHome.items[12].items.map((album) => (
            <div className={cx("album")}>
              <img src={album.thumbnailM} alt={album.title} />
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
                onClick={() => {
                  handleItemNewMusicClick(item.id);
                }}
                className={cx("nav-btn", { active: item.id === activeId })}
              >
                {item.title}
              </button>
            ))}
          </div>
          <div className={cx("container-content", "container-musics")}>
            {dataHome.items[3].items[sortNewMusic].map(
              (music, index) =>
                index < 12 && (
                  <div key={index} className={cx("container-colum")}>
                    {/* <div
                      className={cx("music", {
                        active: songId === music.encodeId,
                      })}
                      onClick={() => handleClickSong(music, index)}
                    >
                      <div className={cx("media-left")}>
                        <img
                          className={cx("media-new-music")}
                          src={music.thumbnailM}
                          alt={music.title}
                        />
                        <div className={cx("opacity")}></div>
                        <button className={cx("btn-play")}>
                          {songId === music.encodeId && isPlaying ? (
                            <BsPauseCircle />
                          ) : (
                            <BsPlayCircle />
                          )}
                        </button>
                      </div>
                      <div className={cx("inf")}>
                        <h5 className={cx("name-music")}>{music.title}</h5>
                        <span>
                          {music.artists.map((artist, index) => (
                            <span className={cx("singer")} key={index}>
                              {artist.name}
                              {""}
                              {index === music.artists.length - 1 ? "" : ", "}
                            </span>
                          ))}
                        </span>
                        <span className={cx("time")}>Hôm qua</span>
                      </div>
                      <TippyToolTip content="Khác">
                        <div className={cx("three-dot")}>
                          <Button className={cx("btn-icon")}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                          </Button>
                        </div>
                      </TippyToolTip>
                    </div> */}
                    <MusicItem
                      music={music}
                      index={index}
                      time
                      home
                      sortNewMusic={sortNewMusic}
                    />
                  </div>
                )
            )}
          </div>
          {/*  Chill, Focus, Nghệ Sĩ Thịnh Hành  */}
          {dataHome.items.map(
            (section, index) =>
              index >= 4 &&
              index <= 6 && (
                <div key={index} className={cx("container-section")}>
                  <span className={cx("title-section")}>{section.title}</span>
                  <div className={cx("container-content")}>
                    {section.items.map((item, index2) => (
                      <div key={index2} className={cx("item-section")}>
                        <Link
                          to={item.link}
                          className={cx("media-section")}
                          onClick={() =>
                            dispatch(actions.setAlbumId(item.encodeId))
                          }
                        >
                          <img src={item.thumbnail} alt={item.title} />
                          <div className={cx("btn-section")}>
                            <BsPlayCircle />
                          </div>
                          <div className={cx("opacity")}></div>
                        </Link>
                        <span className={cx("content-section")}>
                          {item.sortDescription}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
          {/*  BXH Nhạc Mới   */}

          <div className={cx("container-section")}>
            <span className={cx("title-section")}>
              <span>BXH Nhạc Mới</span>
              <div className={cx("more-section")}>
                <span className={cx("more-section")}>Tất cả</span>
                <GrNext />
              </div>
            </span>
            <div className={cx("wrapper-main")}>
              <div className={cx("container-content")}>
                {dataHome.items[7].items.map((item, index) => (
                  <div
                    key={index}
                    className={cx("item-container")}
                    style={{
                      transform: `translateX(${translateSlideXBxh}%)`,
                    }}
                  >
                    <div key={index} className={cx("music-item")}>
                      <div className={cx("media-left")}>
                        <img
                          className={cx("music-media")}
                          src={item.thumbnailM}
                          alt={item.title}
                        />
                        <div className={cx("opacity")}></div>
                        <button className={cx("btn-section")}>
                          <BsPlayCircle />
                        </button>
                      </div>
                      <div className={cx("music-content")}>
                        <div className={cx("music-info")}>
                          <div className={cx("music-title")}>{item.title}</div>
                          <div className={cx("music-artits")}>
                            {item.artists.map((artist, index) => (
                              <span className={cx("singer")} key={index}>
                                {artist.name}
                                {""}
                                {index === item.artists.length - 1 ? "" : ", "}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className={cx("number-top")}>
                          <span
                            style={{ fontStyle: "italic", paddingRight: "6px" }}
                          >
                            #
                          </span>
                          {index + 1}
                        </div>
                        <div className={cx("date-release")}>
                          {new Date(item.releaseDate * 1000).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  className={cx("item-container")}
                  style={{
                    transform: `translateX(${translateSlideXBxh}%)`,
                  }}
                >
                  <div className={cx("music-item", "view-all")}>
                    <span>Xem tất cả </span>
                  </div>
                </div>
              </div>
              <button
                className={cx("btn-bxh-left", "navigation-btn")}
                onClick={() => handleBackTranslteXBxh()}
              >
                <IoIosArrowBack />
              </button>
              <button
                className={cx("btn-bxh-right", "navigation-btn")}
                onClick={() => handleNextTranslteXBxh()}
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default memo(Home);
