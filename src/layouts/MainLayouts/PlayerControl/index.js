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
import { useEffect, useRef, useState } from "react";
import { BsWindowFullscreen } from "react-icons/bs";
import { GiMicrophone } from "react-icons/gi";
import { BiVolumeFull } from "react-icons/bi";
import { MdQueueMusic, MdOutlineVideoLibrary } from "react-icons/md";

import Button from "~/components/Button/Button";
import styles from "./PlayerControl.module.scss";
import * as apis from "~/apis";
import * as actions from "~/redux/actions";
import { useDispatch, useSelector } from "react-redux";

const cx = classNames.bind(styles);

function PlayerControl() {
  const dispatch = useDispatch();

  const sid = useSelector((state) => state.sidReducer.sid); // sid bug render liên tục khi play nhạc
  const playlistSid = useSelector((state) => state.playlist.sid);

  const refbar = useRef();

  const [curSongId, setCurSongId] = useState(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [audio, setAudio] = useState(new Audio());
  const [songInf, setSongInf] = useState(null);
  const [widthDuration, setWidthDuration] = useState(0);
  const [song, setSong] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const endedSong = audio.duration - audio.currentTime === 0;

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const trackRef = refbar.current.getBoundingClientRect();
      const percent = ((e.clientX - trackRef.left) / trackRef.width) * 100;
      setWidthDuration(percent);
    }
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
    const trackRef = refbar.current.getBoundingClientRect();
    const percent = ((e.clientX - trackRef.left) / trackRef.width) * 100;
    audio.currentTime = (audio.duration * percent) / 100;
  };

  const currentTimeSong =
    Math.floor(audio.currentTime / 60)
      .toString()
      .padStart(2, "0") +
    ":" +
    Math.floor(audio.currentTime - Math.floor(audio.currentTime / 60) * 60)
      .toString()
      .padStart(2, "0");

  const timeLeftSong =
    Math.floor((audio.duration - audio.currentTime) / 60)
      .toString()
      .padStart(2, "0") +
    ":" +
    Math.floor(
      audio.duration -
        audio.currentTime -
        Math.floor((audio.duration - audio.currentTime) / 60) * 60
    )
      .toString()
      .padStart(2, "0");

  const handleClickBack = () => {
    dispatch(
      actions.setControlPlayer({
        isBack: Math.random(),
        isShuffling: isShuffling,
      })
    );
  };

  const handleClickNext = () => {
    dispatch(
      actions.setControlPlayer({
        isNext: Math.random(),
        isShuffling: isShuffling,
      })
    );
  };

  useEffect(() => {
    audio.addEventListener("ended", handleClickNext);
  }, [endedSong]);

  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.getDetailSong(curSongId),
        apis.getSong(curSongId),
      ]);
      if (res1.data.err === 0) {
        setSongInf(res1.data.data);
      }
      if (res2.data.err === 0) {
        audio.pause();
        setAudio(new Audio(res2.data.data["128"]));
      } else {
        setAudio(new Audio());
        setIsPlaying(false);
        audio.pause();
        handleClickNext();
      }

      setSong(res2.data.err === 0);
    };
    fetchDetailSong();
  }, [curSongId]);

  useEffect(() => {
    const updateWidth = () => {
      const newWidth = (audio.currentTime / audio.duration) * 100;
      setWidthDuration(!isDragging && newWidth);
    };
    audio.addEventListener("timeupdate", updateWidth);
    return () => {
      audio.removeEventListener("timeupdate", updateWidth);
    };
  }, [audio, isDragging]);

  useEffect(() => {
    if (window.location.pathname === "/") {
      setCurSongId(sid);
    } else {
      setCurSongId(playlistSid);
    }
  }, [sid, playlistSid]);

  useEffect(() => {
    if (song) {
      audio.load();
      setIsPlaying(true);
      audio.play();
    }
  }, [audio]);

  useEffect(() => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("level-left")}>
        <div className={cx("media")}>
          <div className={cx("media-thumnail")}>
            <img src={songInf?.album.thumbnail} alt="" />
          </div>

          <div className={cx("media-content")}>
            <div className={cx("content-name")}>
              <span>{songInf?.album.title}</span>
            </div>
            <div className={cx("content-artists")}>
              <span>{songInf?.album.artistsNames}</span>
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
            <div
              onClick={() => setIsShuffling(!isShuffling)}
              className={cx({ active: isShuffling })}
            >
              <Button className={cx("btn-icon")}>
                <FontAwesomeIcon icon={faShuffle} />
              </Button>
            </div>
          </TippyToolTip>
          <div onClick={handleClickBack}>
            <Button className={cx("btn-icon")}>
              <FontAwesomeIcon icon={faBackwardStep} />
            </Button>
          </div>
          <button
            onClick={() => {
              if (song) {
                setIsPlaying(!isPlaying);
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
          <div onClick={handleClickNext}>
            <Button className={cx("btn-icon")}>
              <FontAwesomeIcon icon={faForwardStep} />
            </Button>
          </div>
          <TippyToolTip content="Bật phát lại tất cả">
            <div
              onClick={() => setIsRepeating(!isRepeating)}
              className={cx({ active: isRepeating })}
            >
              <Button className={cx("btn-icon")}>
                <FontAwesomeIcon icon={faRepeat} />
              </Button>
            </div>
          </TippyToolTip>
        </div>

        <div className={cx("center-duration")}>
          <span className={cx("time", "left")}>{currentTimeSong}</span>

          <div
            ref={refbar}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className={cx("duration-bar")}
          >
            <div
              className={cx("bar-cover")}
              style={{
                width: `${widthDuration}%`,
              }}
            >
              <div className={cx("bar-circle")}></div>
            </div>
          </div>
          <span className={cx("time", "right")}>
            {timeLeftSong === "NaN:NaN" ? "00:00" : timeLeftSong}
          </span>
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

export default PlayerControl;
