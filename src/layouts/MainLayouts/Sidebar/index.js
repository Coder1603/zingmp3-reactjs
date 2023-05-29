import { Link, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import styles from "./Sidebar.module.scss";
import Button from "~/components/Button";
import SIDE_BAR from "~/untils/sidebar";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function Sidebar() {
  const { songId } = useSelector((state) => state.controlPlayer);
  const location = useLocation();
  return (
    <div className={cx("wrapper")}>
      <div className={cx("main")}>
        <Link to={"/"} className={cx("logo")}>
          <img
            src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg"
            alt=""
          />
        </Link>
        <ul className={cx("container")}>
          {SIDE_BAR.map(
            (nav, idx) =>
              nav.top && (
                <Button
                  key={idx}
                  to={nav.to}
                  sidebar
                  leftIcon={nav.leftIcon}
                  rightIcon={nav.rightIcon}
                  className={cx(nav.to === location.pathname ? "active" : "")}
                >
                  <span>{nav.title}</span>
                </Button>
              )
          )}
        </ul>
      </div>
      <div className={cx("sidebar-divide")}></div>
      <div className={cx("sub")}>
        <ul className={cx("container")}>
          {SIDE_BAR.map(
            (nav, idx) =>
              nav.bottom && (
                <Button
                  key={idx}
                  to={nav.to}
                  sidebar
                  leftIcon={nav.leftIcon}
                  rightIcon={nav.rightIcon}
                  className={cx(nav.to === location.pathname ? "active" : "")}
                >
                  <span>{nav.title}</span>
                </Button>
              )
          )}
        </ul>
      </div>
      <div className={cx("sticky-sidebar", { bottom_90px: songId })}>
        <Button>
          <FontAwesomeIcon icon={faPlus} />
          <span style={{ marginLeft: "4px", fontWeight: 500 }}>
            Tạo playlist mới
          </span>
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
