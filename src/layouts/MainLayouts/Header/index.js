import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TippyTollTip from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react/headless";

import styles from "./Header.module.scss";
import {
  faArrowLeftLong,
  faArrowRightLong,
  faDownload,
  faGear,
  faGem,
  faShirt,
} from "@fortawesome/free-solid-svg-icons";
import { memo, useCallback, useState } from "react";

import Button from "~/components/Button";
import Popper from "~/components/Popper";
import MENU_LIST from "~/untils/menu";
import Search from "~/components/Search";

const cx = classNames.bind(styles);

function Header() {
  const [backDisabled, setBackDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const handleBackPage = useCallback(() => {
    if (window.history.state.idx === 0) {
      setBackDisabled(true);
    } else {
      window.history.back();
      setNextDisabled(false);
    }
  }, []);
  const handleNextPage = useCallback(() => {
    if (window.history.length === window.history.state.idx + 2) {
      setNextDisabled(true);
    } else {
      window.history.forward();
      setBackDisabled(false);
    }
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("level-left")}>
        <Button
          disabled={backDisabled}
          onClick={handleBackPage}
          className={cx("arrow")}
        >
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </Button>
        <Button
          disabled={nextDisabled}
          onClick={handleNextPage}
          className={cx("arrow")}
        >
          <FontAwesomeIcon icon={faArrowRightLong} />
        </Button>
        <Search />
      </div>
      <div className={cx("level-right")}>
        <Button
          href="/"
          leftIcon={
            <FontAwesomeIcon
              className={cx("download-icon")}
              icon={faDownload}
            />
          }
          className={cx("download-desktop-app")}
        >
          <span className={cx("download-content")}>Tải bản Windows</span>
        </Button>
        <TippyTollTip content="Chủ đề">
          <button className={cx("setting-item")}>
            <FontAwesomeIcon icon={faShirt} />
          </button>
        </TippyTollTip>
        <TippyTollTip content="Nâng cấp vip">
          <a href="/" className={cx("setting-item")}>
            <FontAwesomeIcon icon={faGem} />
          </a>
        </TippyTollTip>
        <div>
          <Tippy
            trigger="click"
            hideOnClick
            interactive
            render={(attrs) => (
              <div className={cx("menu-options")} tabIndex="-1" {...attrs}>
                <Popper menu>
                  <div className={cx("menu-container")}>
                    <div className={cx("container-menu-top")}>
                      {MENU_LIST.map(
                        (list, idx) =>
                          list.top && (
                            <div
                              key={idx}
                              className={cx("menu-option", "menu-top")}
                            >
                              <span className={cx("menu-icon")}>
                                {list.icon}
                              </span>
                              <span className={cx("menu-title")}>
                                {list.title}
                              </span>
                              {list.icon_sub && (
                                <span className={cx("menu-icon-sub")}>
                                  {list.icon_sub}
                                </span>
                              )}

                              <div className={cx("menu-hover-container")}>
                                {list.children &&
                                  list.children.map((children, idx) => (
                                    <button
                                      key={idx}
                                      className={cx(
                                        "menu-hover-option",
                                        "menu-option"
                                      )}
                                    >
                                      {children.title && (
                                        <b className={cx("title-hover")}>
                                          {children.title}
                                        </b>
                                      )}
                                      {children.description && (
                                        <div className={cx("description")}>
                                          {children.description}
                                        </div>
                                      )}
                                      {children.content && (
                                        <div
                                          className={cx(
                                            "container-content-hover"
                                          )}
                                        >
                                          <span className={cx("content-hover")}>
                                            {children.content}
                                          </span>
                                          <span
                                            className={cx(
                                              "container-btn-start",
                                              {
                                                active: true,
                                              }
                                            )}
                                          >
                                            {/* <div className={cx("circle")}></div> */}
                                          </span>
                                        </div>
                                      )}
                                    </button>
                                  ))}
                              </div>
                            </div>
                          )
                      )}
                    </div>

                    <div className={cx("dash")}></div>

                    <div className={cx("container-menu-bottom")}>
                      {MENU_LIST.map(
                        (list, idx) =>
                          list.bottom && (
                            <button
                              key={idx}
                              className={cx("menu-option", "menu-bottom")}
                            >
                              <span className={cx("menu-icon")}>
                                {list.icon}
                              </span>
                              <span className={cx("menu-title")}>
                                {list.title}
                              </span>
                            </button>
                          )
                      )}
                    </div>
                  </div>
                </Popper>
              </div>
            )}
          >
            <TippyTollTip content="Cài đặt">
              <button className={cx("setting-item")}>
                <FontAwesomeIcon icon={faGear} />
              </button>
            </TippyTollTip>
          </Tippy>
        </div>
        <div className={cx("login-container")}>
          <img
            src="https://avatar.talk.zdn.vn/default.jpg"
            className={cx("avatar")}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default memo(Header);
