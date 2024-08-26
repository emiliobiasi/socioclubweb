import styles from "./SideBar.module.css";
import { FireFilled } from "@ant-design/icons";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <div className={styles.logoIcon}>
        <FireFilled />
      </div>
    </div>
  );
};

export default Logo;
