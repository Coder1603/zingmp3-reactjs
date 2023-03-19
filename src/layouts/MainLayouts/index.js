import classNames from "classnames/bind";

import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./MainLayouts.module.scss";
import Footer from "./Footer";

const cx = classNames.bind(styles);

function MainLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Sidebar />
      <div className={cx("container")}>
        <Header />
        <div className={cx("content")}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
