import classNames from "classnames/bind";
import { memo } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./SectionPlaylist.module.scss";
import * as actions from "~/redux/actions";
import { BsPlayCircle } from "react-icons/bs";

const cx = classNames.bind(styles);

function SectionPlaylist({ data, top100 }) {
  const dispatch = useDispatch();

  return (
    <div className={cx("wrapper", { top100: top100 })}>
      <span className={cx("title-section")}>{data.title}</span>
      <div className={cx("container-content")}>
        {data.items.map((item, index) => (
          <div key={index} className={cx("item-section")}>
            <Link
              to={item.link}
              className={cx("media-section")}
              onClick={() => dispatch(actions.setAlbumId(item.encodeId))}
            >
              <img src={item.thumbnailM} alt={item.title} />
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
  );
}
export default memo(SectionPlaylist);
