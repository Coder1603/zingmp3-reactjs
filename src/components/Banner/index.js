import classNames from "classnames/bind";
import { memo } from "react";

import styles from "./Banner.module.scss";

const cx = classNames.bind(styles);

function Banner({ data }) {
  return (
    <div className={cx("wrapper")}>
      <div
        className={cx("bg-blur")}
        style={{
          background: `url(${data.source})
    top/cover no-repeat`,
        }}
      ></div>
      <div className={cx("bg-alpha")}></div>
      <div className={cx("bg-alpha1")}></div>
      {data.svg}
    </div>
  );
}

export default memo(Banner);
