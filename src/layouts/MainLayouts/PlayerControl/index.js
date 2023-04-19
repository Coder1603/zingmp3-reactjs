import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faHeart } from "@fortawesome/free-solid-svg-icons";
import TippyToolTip from "@tippyjs/react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BsWindowFullscreen } from "react-icons/bs";
import { GiMicrophone } from "react-icons/gi";
import { BiVolumeFull } from "react-icons/bi";
import { MdQueueMusic, MdOutlineVideoLibrary } from "react-icons/md";

import Button from "~/components/Button/Button";
import styles from "./PlayerControl.module.scss";
import * as apis from "~/apis";
import * as actions from "~/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { BsPauseCircle, BsPlayCircle } from "react-icons/bs";
import { AiOutlineStepBackward, AiOutlineStepForward } from "react-icons/ai";

import { BsRepeat, BsShuffle } from "react-icons/bs";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function PlayerControl() {
  const dispatch = useDispatch();
  const { songId, isPlaying, isShuffling, playlist, indexSong } = useSelector(
    (state) => state.controlPlayer
  );
  const refBarVolume = useRef();
  const refBarAudio = useRef();
  const audioRef = useRef(new Audio());
  const isShufflingRef = useRef();
  isShufflingRef.current = isShuffling;

  const [isRepeating, setIsRepeating] = useState(false);
  const [audio, setAudio] = useState(new Audio());
  const [songInf, setSongInf] = useState(null);
  const [widthDuration, setWidthDuration] = useState(0);
  const [widthDurationVolume, setWidthDurationVolume] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [isAudioBarActive, setIsAudioBarActive] = useState(false);
  const [muteVolume, setMuteVolume] = useState(false);

  const endedSong = useMemo(() => {
    return audio.duration - audio.currentTime === 0;
  }, [audio]);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        if (refBarAudio.current.contains(e.target)) {
          const trackRef = refBarAudio.current.getBoundingClientRect();
          const percent = ((e.clientX - trackRef.left) / trackRef.width) * 100;
          setWidthDuration(percent);
          setIsAudioBarActive(true);
        } else if (refBarVolume.current.contains(e.target)) {
          const trackRef = refBarVolume.current.getBoundingClientRect();
          const percent = ((e.clientX - trackRef.left) / trackRef.width) * 100;
          setWidthDurationVolume(percent);
          setIsAudioBarActive(false);
        }
      }

      return;
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(
    (e) => {
      setIsDragging(false);
      if (refBarAudio.current.contains(e.target)) {
        const trackRef = refBarAudio?.current?.getBoundingClientRect();
        const percent = ((e.clientX - trackRef.left) / trackRef.width) * 100;
        audio.currentTime = (audio.duration * percent) / 100;
        setIsAudioBarActive(true);
      } else if (refBarVolume.current.contains(e.target)) {
        const trackRef = refBarVolume?.current?.getBoundingClientRect();
        const percent = ((e.clientX - trackRef.left) / trackRef.width) * 100;
        if (percent < 0) {
          audio.volume = 0;
          setWidthDurationVolume(0);
        } else if (percent > 100) {
          audio.volume = 1;
          setWidthDurationVolume(100);
        } else {
          audio.volume = percent / 100;
          setWidthDurationVolume(percent);
        }
        setIsAudioBarActive(false);
      }
    },
    [audio, refBarAudio, refBarVolume]
  );
  const currentTimeSong = useMemo(() => {
    return (
      Math.floor(audio.currentTime / 60)
        .toString()
        .padStart(2, "0") +
      ":" +
      Math.floor(audio.currentTime - Math.floor(audio.currentTime / 60) * 60)
        .toString()
        .padStart(2, "0")
    );
  }, [audio.currentTime]);

  const timeLeftSong = useMemo(() => {
    return (
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
        .padStart(2, "0")
    );
  }, [audio.duration, audio.currentTime]);

  useEffect(() => {
    if (isDragging) {
      if (isAudioBarActive) {
        const barRef = refBarAudio.current;
        barRef.addEventListener("mouseleave", handleMouseUp);
        return () => {
          barRef.removeEventListener("mouseleave", handleMouseUp);
        };
      } else {
        const barRef = refBarVolume.current;
        barRef.addEventListener("mouseleave", handleMouseUp);
        return () => {
          barRef.removeEventListener("mouseleave", handleMouseUp);
        };
      }
    }
  }, [handleMouseUp, isDragging, isAudioBarActive]);

  const handleClickBack = useCallback(() => {
    if (isShufflingRef.current) {
      let randomIndex = Math.floor(Math.random() * playlist.length);
      dispatch(actions.setSongId(playlist[randomIndex].encodeId));
      dispatch(actions.setIndexSongPlaylist(randomIndex));
    } else {
      if (indexSong > 0) {
        dispatch(actions.setSongId(playlist[indexSong - 1].encodeId));
        dispatch(actions.setIndexSongPlaylist(indexSong - 1));
      } else {
        dispatch(actions.setSongId(playlist[playlist.length - 1].encodeId));
        dispatch(actions.setIndexSongPlaylist(playlist.length - 1));
      }
    }
    dispatch(actions.setPlay(true));
  }, [dispatch, playlist, indexSong]);

  const handleClickNext = useCallback(() => {
    if (isShufflingRef.current) {
      let randomIndex = Math.floor(Math.random() * playlist.length);
      dispatch(actions.setSongId(playlist[randomIndex].encodeId));
      dispatch(actions.setIndexSongPlaylist(randomIndex));
    } else {
      if (indexSong < playlist.length - 1) {
        dispatch(actions.setSongId(playlist[indexSong + 1].encodeId));
        dispatch(actions.setIndexSongPlaylist(indexSong + 1));
      } else {
        dispatch(actions.setSongId(playlist[0].encodeId));
        dispatch(actions.setIndexSongPlaylist(0));
      }
    }
    dispatch(actions.setPlay(true));
  }, [dispatch, playlist, indexSong]);

  const handleClickShuffle = useCallback(
    () => dispatch(actions.setShuffle(!isShuffling)),
    [dispatch, isShuffling]
  );

  useEffect(() => {
    if ((playlist && playlist.length !== indexSong + 1) || isRepeating) {
      audio.addEventListener("ended", handleClickNext);
      return () => {
        audio.removeEventListener("ended", handleClickNext);
      };
    }
  }, [audio, handleClickNext, endedSong, indexSong, playlist, isRepeating]);

  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.getDetailSong(songId),
        apis.getSong(songId),
      ]);
      if (res1.data.err === 0) {
        setSongInf(res1.data.data);
      }
      if (res2.data.err === 0) {
        audioRef.current.pause();
        audioRef.current.src = res2.data.data["128"];
        audioRef.current.load();
        audioRef.current.play();
        setAudio(audioRef.current);
      } else {
        handleClickNext();
      }
    };
    fetchDetailSong();
  }, [songId, handleClickNext, dispatch]);

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
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  const handleBeforeUnload = useCallback(() => {
    dispatch(actions.setPlay(false));
  }, [dispatch]);

  useEffect(() => {
    window.onbeforeunload = handleBeforeUnload;
    return () => {
      window.onbeforeunload = null;
    };
  }, [handleBeforeUnload]);

  // console.log("re-render-controlPlayer");

  return (
    songInf && (
      <div className={cx("wrapper")}>
        <div className={cx("level-left")}>
          <Link to={playlist[0].album?.link} className={cx("media")}>
            <div className={cx("media-thumnail")}>
              <img src={songInf.thumbnailM} alt="" />
            </div>

            <div className={cx("media-content")}>
              <div className={cx("content-name")}>
                <span>{songInf.title}</span>
              </div>
              <div className={cx("content-artists")}>
                <span>{songInf.artistsNames}</span>
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
          </Link>
        </div>
        <div className={cx("level-center")}>
          <div className={cx("center-action")}>
            <TippyToolTip content="Bật phát ngẫu nhiên">
              <div
                onClick={() => {
                  handleClickShuffle();
                }}
                className={cx({ active: isShuffling })}
              >
                <Button className={cx("btn-icon")}>
                  <BsShuffle />
                </Button>
              </div>
            </TippyToolTip>
            <div onClick={handleClickBack}>
              <Button className={cx("btn-icon")}>
                <AiOutlineStepBackward />
              </Button>
            </div>
            <button
              onClick={() => dispatch(actions.setPlay(!isPlaying))}
              className={cx("play-pause")}
            >
              {isPlaying ? <BsPauseCircle /> : <BsPlayCircle />}
            </button>
            <div onClick={handleClickNext}>
              <Button className={cx("btn-icon")}>
                <AiOutlineStepForward />
              </Button>
            </div>
            <TippyToolTip content="Bật phát lại tất cả">
              <div
                onClick={() => setIsRepeating(!isRepeating)}
                className={cx({ active: isRepeating })}
              >
                <Button className={cx("btn-icon")}>
                  <BsRepeat />
                </Button>
              </div>
            </TippyToolTip>
          </div>

          <div className={cx("center-duration")}>
            <span className={cx("time", "left")}>{currentTimeSong}</span>

            <div
              ref={refBarAudio}
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
            <div onClick={() => setMuteVolume(!muteVolume)}>
              <Button className={cx("btn-icon")}>
                <BiVolumeFull />
              </Button>
            </div>

            <div
              className={cx("duration-bar", "volume-bar")}
              ref={refBarVolume}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <div
                className={cx("bar-cover")}
                style={{
                  width: `${widthDurationVolume}%`,
                }}
              >
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
    )
  );
}

export default memo(PlayerControl);
