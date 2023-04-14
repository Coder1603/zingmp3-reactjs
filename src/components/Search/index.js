import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react/headless";

import styles from "./Search.module.scss";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { memo, useCallback, useEffect, useRef, useState } from "react";

import Button from "~/components/Button";
import Popper from "~/components/Popper";
import * as apis from "~//apis";
import MusicItem from "../MusicItem";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineClear } from "react-icons/md";

const cx = classNames.bind(styles);

function Search() {
  const [inputValue, setInputValue] = useState("");
  const [dataSearch, setDataSearch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loadingResultSearch, setLoadingResultSearch] = useState(false);
  const inputRef = useRef(null);

  const handleHidden = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleVisible = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleInput = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleDeleteValueInput = useCallback(() => {
    inputRef.current.focus();
    setInputValue("");
    setDataSearch([]);
  }, []);

  useEffect(() => {
    setLoadingResultSearch(true);
    const fetchSearch = async () => {
      const response = await apis.getSearch(inputValue);
      setDataSearch(response.data.data);
      setLoadingResultSearch(false);
    };
    fetchSearch();
  }, [inputValue]);

  console.log(isVisible);

  return (
    <div className={cx("wrapper", { activeSearch: isVisible })}>
      <Button
        leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
        className={cx("search-btn")}
      ></Button>
      <div style={{ width: "100%" }}>
        <Tippy
          visible={isVisible}
          onClickOutside={handleHidden}
          render={(attrs) => (
            <div className="box" tabIndex="-1" {...attrs}>
              <Popper search>
                <h5 className={cx("search-title")}>
                  {" "}
                  {dataSearch?.songs ? "Gợi ý kết quả" : "Không có kết quả"}
                </h5>

                {dataSearch?.songs?.map(
                  (song, index) =>
                    index < 6 && (
                      <MusicItem
                        key={index}
                        index={index}
                        music={song}
                        search
                        playlistSearch={dataSearch.songs}
                      />
                    )
                )}
              </Popper>
            </div>
          )}
          interactive
          onHide={handleHidden}
        >
          <input
            value={inputValue}
            onFocus={handleVisible}
            onChange={handleInput}
            ref={inputRef}
            className={cx("search-input")}
            type="text"
            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
          />
        </Tippy>
      </div>

      <button onClick={handleDeleteValueInput}>
        {inputValue &&
          (loadingResultSearch ? (
            <AiOutlineLoading3Quarters
              className={cx("loading", "loading-clear")}
            />
          ) : (
            <MdOutlineClear className={cx("loading-clear")} />
          ))}
      </button>
    </div>
  );
}

export default memo(Search);
