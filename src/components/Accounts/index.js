import {
  faEllipsisVertical,
  faHeart,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import "tippy.js/dist/tippy.css";
import TippyTollTip from "@tippyjs/react";
import styles from "./Accounts.module.scss";
import Button from "../Button/Button";

const cx = classNames.bind(styles);

function Accounts({ data }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("media-left")}>
        <img src={data.thumbnailM} alt="" />
        <button className={cx("play-btn")}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <div className={cx("opacity")}></div>
      </div>
      <div className={cx("content")}>
        <h4 className={cx("title")}>{data.title}</h4>
        <span className={cx("sub-title")}> {data.artistsNames}</span>
      </div>
      <div className={cx("media-right")}>
        <TippyTollTip content="Thêm vào thư viện">
          <div>
            <Button className={cx("btn-icon")}>
              <FontAwesomeIcon className={cx("icon-heart")} icon={faHeart} />
            </Button>
          </div>
        </TippyTollTip>
        <TippyTollTip content="Khác">
          <div>
            <Button className={cx("btn-icon")}>
              <FontAwesomeIcon
                className={cx("icon-more")}
                icon={faEllipsisVertical}
              />
            </Button>
          </div>
        </TippyTollTip>
      </div>
    </div>
  );
}

export default Accounts;
