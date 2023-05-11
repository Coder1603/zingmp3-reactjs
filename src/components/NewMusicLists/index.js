import classNames from "classnames/bind";
import { memo, useCallback, useState } from "react";

import { NEW_MUSIC } from "~/untils/homeConst";
import styles from "./NewMusicLists.module.scss";
import MusicItem from "~/components/MusicItem";

const cx = classNames.bind(styles);

function NewMusicLists({ data }) {
  const [activeId, setActiveId] = useState(0);
  const [sortNewMusic, setSortNewMusic] = useState("all");

  const handleItemNewMusicClick = useCallback((id) => {
    setActiveId(id);
    if (id === 0) {
      setSortNewMusic("all");
    } else if (id === 1) {
      setSortNewMusic("others");
    } else {
      setSortNewMusic("vPop");
    }
  }, []);

  return (
    <div className={cx("wrapper")}>
      <span className={cx("title-section")}>{data.title}</span>
      <div className={cx("nav-new")}>
        {NEW_MUSIC.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              handleItemNewMusicClick(item.id);
            }}
            className={cx("nav-btn", { active: item.id === activeId })}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className={cx("container-musics")}>
        {data?.items[sortNewMusic]?.map(
          (music, index) =>
            index < 12 && (
              <div key={index} className={cx("container-colum")}>
                <MusicItem
                  music={music}
                  index={index}
                  time
                  home
                  sortNewMusic={sortNewMusic}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default memo(NewMusicLists);
