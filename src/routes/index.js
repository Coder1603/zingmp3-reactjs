import Home from "~/pages/Home";
import Zingchart from "~/pages/Zingchart/idnex";
import Radio from "~/pages/Radio";
import Folowing from "~/pages/Following";
import NewMusic from "~/pages/NewMusic";
import Hub from "~/pages/Hub";
import Top100 from "~/pages/Top100";
import Mv from "~/pages/Mv";
import Album from "~/components/Album";

//Public Routes
const publicRoutes = [
  {
    path: "/*",
    compenent: Home,
  },
  {
    path: "/zing-chart",
    compenent: Zingchart,
  },
  {
    path: "/radio",
    compenent: Radio,
  },
  {
    path: "/folowing",
    compenent: Folowing,
  },
  {
    path: "/newmusic",
    compenent: NewMusic,
  },
  {
    path: "/hub",
    compenent: Hub,
  },
  {
    path: "/top100",
    compenent: Top100,
  },
  {
    path: "/mv",
    compenent: Mv,
  },
  {
    path: "/album/:pid/:sid",
    compenent: Album,
  },
  {
    path: "/playlist/:pid/:sid",
    compenent: Album,
  },
];
//Private Routes

const privateRoutes = [];

export { publicRoutes, privateRoutes };
