import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faMusic,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { HiOutlineStopCircle } from "react-icons/hi2";
import { ImFileMusic } from "react-icons/im";
import { FaChartPie } from "react-icons/fa";
import { IoRadioOutline, IoMusicalNotesOutline } from "react-icons/io5";
import { GoNote } from "react-icons/go";
import { VscGroupByRefType } from "react-icons/vsc";
import { AiOutlineStar } from "react-icons/ai";
import { MdOutlineVideoLibrary } from "react-icons/md";

const SIDE_BAR = [
  {
    title: "Cá nhân",
    leftIcon: <ImFileMusic />,
    top: true,
  },
  {
    title: "Khám phá",
    leftIcon: <HiOutlineStopCircle />,
    to: "/",
    top: true,
  },
  {
    title: "#zingchart",
    leftIcon: <FaChartPie />,
    rightIcon: <FontAwesomeIcon icon={faCirclePlay} />,
    top: true,
    to: "/zing-chart",
  },
  {
    title: "Radio",
    leftIcon: <IoRadioOutline />,
    rightIcon: <FontAwesomeIcon icon={faCirclePlay} />,
    to: "/Radio",
    top: true,
  },
  {
    title: "Theo dõi",
    leftIcon: <GoNote />,
    top: true,
  },
  {
    title: "Nhạc mới",
    leftIcon: <IoMusicalNotesOutline />,
    rightIcon: <FontAwesomeIcon icon={faCirclePlay} />,
    to: "/newmusic",
    bottom: true,
  },
  {
    title: "Thể loại",
    leftIcon: <VscGroupByRefType />,
    to: "/hub",
    bottom: true,
  },
  {
    title: "Top 100",
    leftIcon: <AiOutlineStar />,
    to: "/top100",
    bottom: true,
  },
  {
    title: "MV",
    leftIcon: <MdOutlineVideoLibrary />,
    to: "/mv",
    bottom: true,
  },
];

export default SIDE_BAR;
