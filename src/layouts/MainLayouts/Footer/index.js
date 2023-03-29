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
import TippyToolTip from "@tippyjs/react";
import { useEffect, useState, useContext } from "react";
import { BsWindowFullscreen } from "react-icons/bs";
import { GiMicrophone } from "react-icons/gi";
import { BiVolumeFull } from "react-icons/bi";
import { MdQueueMusic, MdOutlineVideoLibrary } from "react-icons/md";

import Button from "~/components/Button/Button";
import styles from "./Footer.module.scss";
import * as apis from "~/apis";
import { StoreContext } from "~/store";

const cx = classNames.bind(styles);

function Footer() {
  const [curSongId] = useContext(StoreContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(
    new Audio(
      "https://vnso-zn-15-tf-mp3-s1-zmp3.zmdcdn.me/8e5fc7134953a00df942/2257027387132757047?authen=exp=1680247050~acl=/8e5fc7134953a00df942/*~hmac=063b2fbb9b2a8371d9dcb1c1bc057b6d&fs=MTY4MDA3NDI1MDQ4M3x3ZWJWNnwwfDExNi4xMDMdUngNjQdUngMTQ5"
    )
  );
  const [songInf, setSongInf] = useState(null);

  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.getDetailSong(curSongId),
        apis.getSong(curSongId),
      ]);
      if (res2.data.err === 0) {
        audio.pause();
        setAudio(new Audio(res2.data.data["128"]));
        setIsPlaying(true);
        if (res1.data.err === 0) {
          setSongInf(res1.data.data);
        }
      }
    };
    fetchDetailSong();
  }, [curSongId]);

  useEffect(() => {
    audio.load();
    if (isPlaying) {
      audio && audio.play();
    }
  }, [audio]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("level-left")}>
        <div className={cx("media")}>
          <div className={cx("media-thumnail")}>
            <img
              src={
                songInf
                  ? songInf.album.thumbnail
                  : "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/0/0/c/2/00c2a6e4d929830865540ee154e52211.jpg"
              }
              alt=""
            />
          </div>

          <div className={cx("media-content")}>
            <div className={cx("content-name")}>
              <span>
                {songInf ? songInf.album.title : "Chuyện Chúng Ta Sau Này"}
              </span>
            </div>
            <div className={cx("content-artists")}>
              <span>
                {songInf ? songInf.album.artistsNames : "Hải Đăng Doo"}
              </span>
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
            onClick={() => {
              setIsPlaying(!isPlaying);
              if (isPlaying) {
                setIsPlaying(false);
                audio.pause();
              } else {
                setIsPlaying(true);
                audio.play();
              }
            }}
            className={cx("play-pause")}
          >
            {isPlaying ? (
              <FontAwesomeIcon icon={faCirclePause} />
            ) : (
              <FontAwesomeIcon icon={faCirclePlay} />
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
