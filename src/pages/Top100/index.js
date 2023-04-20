import classNames from "classnames/bind";
import { memo, useEffect, useState } from "react";

import styles from "./Top100.module.scss";
import * as apis from "~/apis";
import SectionPlaylist from "~/components/SectionPlaylist";
import Banner from "~/components/Banner";
import { BANNER_TOP100 } from "~/untils/banner";

const cx = classNames.bind(styles);

function Top100() {
  const [dataTop100, setDataTop100] = useState(null);

  useEffect(() => {
    const fetchDataHome = async () => {
      const response = await apis.getTop100();
      setDataTop100(response.data.data);
    };
    fetchDataHome();
  }, []);

  useEffect(() => {
    document.title = "Top 100 | Tuyển tập nhạc hay chọn lọc";
  }, []);

  console.log(dataTop100);

  return (
    dataTop100 && (
      <div className={cx("wrapper")}>
        <Banner data={BANNER_TOP100} />
        {dataTop100.map((section) => (
          <SectionPlaylist top100 data={section} />
        ))}
      </div>
    )
  );
}

export default memo(Top100);
