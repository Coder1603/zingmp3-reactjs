import classNames from "classnames/bind";

import styles from "./BhxMusics.module.scss";
import { BsPlayCircle } from "react-icons/bs";
import { GrNext } from "react-icons/gr";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { memo, useCallback, useState } from "react";

const cx = classNames.bind(styles);

function BhxMusics({ data }) {
  const [translateSlideXBxh, setTranslateSlideXBxh] = useState("0");

  const handleBackTranslteXBxh = useCallback(() => {
    translateSlideXBxh < 0
      ? setTranslateSlideXBxh(`${Number(translateSlideXBxh) + 100}`)
      : setTranslateSlideXBxh(`${(data.items.length + 1) * -100 + 300}`);
  }, [data, translateSlideXBxh]);

  const handleNextTranslteXBxh = useCallback(() => {
    translateSlideXBxh > (data.items.length + 1) * -100 + 300
      ? setTranslateSlideXBxh(`${Number(translateSlideXBxh) - 100}`)
      : setTranslateSlideXBxh("0");
  }, [data, translateSlideXBxh]);

  return (
    <div className={cx("wrapper")}>
      <span className={cx("title-section")}>
        <span>{data.title}</span>
        <div className={cx("more-section")}>
          <span>Tất cả</span>
          <GrNext />
        </div>
      </span>
      <div className={cx("wrapper-main")}>
        <div className={cx("container-content")}>
          {data?.items?.map((item, index) => (
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
                      {item?.artists?.map((artist, index) => (
                        <span className={cx("singer")} key={index}>
                          {artist.name}
                          {""}
                          {index === item.artists.length - 1 ? "" : ", "}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={cx("number-top")}>
                    <span style={{ fontStyle: "italic", paddingRight: "6px" }}>
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
          onClick={handleBackTranslteXBxh}
        >
          <IoIosArrowBack />
        </button>
        <button
          className={cx("btn-bxh-right", "navigation-btn")}
          onClick={handleNextTranslteXBxh}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}

export default memo(BhxMusics);
