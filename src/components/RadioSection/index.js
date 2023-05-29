import classNames from "classnames/bind";
import styles from "./RadioSection.module.scss";

const cx = classNames.bind(styles);

function RadioSection({ data }) {
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title-section")}>{data.title}</h2>
      <div className={cx("container-main")}>
        {data.items.map((item) => (
          <div className={cx("item-radio")}>
            <div className={cx("top")}>
              <img src={item.thumbnailM} alt={item.title} />
            </div>
            <div>
              <h4>{item.title}</h4>
              <p>{item.activeUsers} đang nghe</p>
            </div>
          </div>
        ))}
      </div>
      <div className={cx("btn-nav")}></div>
    </div>
  );
}

export default RadioSection;
