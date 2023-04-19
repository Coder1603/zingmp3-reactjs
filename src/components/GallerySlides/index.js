import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { memo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./GallerySlides.module.scss";
import * as actions from "~/redux/actions";

const cx = classNames.bind(styles);

function GallerySlides({ data }) {
  const [translateSlideXGallery, setTranslateSlideXGallery] = useState("0");

  const dispatch = useDispatch();

  const handleBackTranslteXGallery = useCallback(() => {
    translateSlideXGallery < 0
      ? setTranslateSlideXGallery(`${Number(translateSlideXGallery) + 100}`)
      : setTranslateSlideXGallery(`${data.items.length * -100 + 300}`);
  }, [data, translateSlideXGallery]);

  const handleNextTranslteXGallery = useCallback(() => {
    translateSlideXGallery > data.items.length * -100 + 300
      ? setTranslateSlideXGallery(`${Number(translateSlideXGallery) - 100}`)
      : setTranslateSlideXGallery("0");
  }, [data, translateSlideXGallery]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextTranslteXGallery();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div className={cx("wrapper")}>
      {data.items.map((galleryItem, idx) => (
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
  );
}

export default memo(GallerySlides);
