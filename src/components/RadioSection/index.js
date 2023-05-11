import classNames from "classnames/bind";
import styles from "./RadioSection.module.scss";

const cx = classNames.bind(styles);

function RadioSection() {
  return <div className={cx("wrapper")}></div>;
}

export default RadioSection;
