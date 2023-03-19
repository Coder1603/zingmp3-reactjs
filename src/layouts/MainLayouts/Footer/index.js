import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faCirclePause,
  faCirclePlay,
  faEllipsisVertical,
  faForwardStep,
  faHeart,
  faRepeat,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button/Button";
import TippyToolTip from "@tippyjs/react";
import { useState } from "react";
import { BsWindowFullscreen } from "react-icons/bs";
import { GiMicrophone } from "react-icons/gi";
import { BiVolumeFull } from "react-icons/bi";
import { MdQueueMusic, MdOutlineVideoLibrary } from "react-icons/md";

import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

function Footer() {
  const [isActivePlay, setIsActivePlay] = useState(true);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("level-left")}>
        <div className={cx("media")}>
          <div className={cx("media-thumnail")}>
            <img
              src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/9/2/8/6/9286a209a5eb472c4fdbd901ade57e8c.jpg"
              alt=""
            />
          </div>

          <div className={cx("media-content")}>
            <div className={cx("content-name")}>
              <span>Mưa Trong Lòng</span>
            </div>
            <div className={cx("content-artists")}>
              <span>Tùng Maru, Vũ Phụng Tiên</span>
            </div>
          </div>

          <div className={cx("media-icon")}>
            <TippyToolTip content="Thêm vào thư viện">
              <div>
                <Button className={cx("btn-icon")}>
                  <FontAwesomeIcon icon={faHeart} />
                </Button>
              </div>
            </TippyToolTip>

            <TippyToolTip content="Xem thêm">
              <div>
                <Button className={cx("btn-icon")}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </Button>
              </div>
            </TippyToolTip>
          </div>
        </div>
      </div>
      <div className={cx("level-center")}>
        <div className={cx("center-action")}>
          <TippyToolTip content="Bật phát ngẫu nhiên">
            <div>
              <Button className={cx("btn-icon")}>
                <FontAwesomeIcon icon={faShuffle} />
              </Button>
            </div>
          </TippyToolTip>
          <Button className={cx("btn-icon")}>
            <FontAwesomeIcon icon={faBackwardStep} />
          </Button>
          <button
            onClick={() => setIsActivePlay(!isActivePlay)}
            className={cx("play-pause")}
          >
            {isActivePlay ? (
              <FontAwesomeIcon icon={faCirclePlay} />
            ) : (
              <FontAwesomeIcon icon={faCirclePause} />
            )}
          </button>
          <Button className={cx("btn-icon")}>
            <FontAwesomeIcon icon={faForwardStep} />
          </Button>
          <TippyToolTip content="Bật phát lại tất cả">
            <div>
              <Button className={cx("btn-icon")}>
                <FontAwesomeIcon icon={faRepeat} />
              </Button>
            </div>
          </TippyToolTip>
        </div>

        <div className={cx("center-duration")}>
          <span className={cx("time", "left")}>00:00</span>
          <div className={cx("duration-bar")}>
            <div className={cx("bar-cover")}>
              <div className={cx("bar-circle")}></div>
            </div>
          </div>
          <span className={cx("time", "right")}>00:54</span>
        </div>
      </div>
      <div className={cx("level-right")}>
        <Button btnMv className={cx("btn-icon")}>
          <MdOutlineVideoLibrary />
        </Button>
        <TippyToolTip content="Xem lời bài hát">
          <div>
            <Button className={cx("btn-icon")}>
              <GiMicrophone />
            </Button>
          </div>
        </TippyToolTip>
        <TippyToolTip content="Chế độ cửa sổ">
          <div>
            <Button className={cx("btn-icon")}>
              <BsWindowFullscreen />
            </Button>
          </div>
        </TippyToolTip>
        <div className={cx("volume")}>
          <Button className={cx("btn-icon")}>
            <BiVolumeFull />
          </Button>
          <div className={cx("duration-bar", "volume-bar")}>
            <div className={cx("bar-cover")}>
              <div className={cx("bar-circle")}></div>
            </div>
          </div>
        </div>
        <div className={cx("divide")}></div>
        <TippyToolTip content="Danh sách phát">
          <div className={cx("list-play")}>
            <Button className={cx("btn-icon")}>
              <MdQueueMusic />
            </Button>
          </div>
        </TippyToolTip>
      </div>
    </div>
  );
}

export default Footer;
