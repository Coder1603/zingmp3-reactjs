import classNames from "classnames/bind";
import styles from "./BannerHome.module.scss";
import { Link } from "react-router-dom";
import { memo } from "react";

const cx = classNames.bind(styles);

function BannerHome({ data }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container-section")}>
        {data?.items?.map((banner, index) => (
          <Link to={banner.link} key={index} className={cx("banner")}>
            <img src={banner.cover} alt="" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default memo(BannerHome);
