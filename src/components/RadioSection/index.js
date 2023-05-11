import classNames from "classnames/bind";
import styles from "./RadioSection.module.scss";

const cx = classNames.bind(styles);

function RadioSection({ data }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container-item")}>
        {data?.items?.map((item, index) => {
          <div key={index} className={cx("item")}></div>;
        })}
      </div>
      <div className={cx("nav-btn")}></div>
    </div>
  );
}

export default RadioSection;
