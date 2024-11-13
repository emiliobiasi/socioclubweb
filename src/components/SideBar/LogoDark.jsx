import styles from "./SideBar.module.css";
import logoSideBar from "../../assets/images/DarkLogoSideBar.png";

const LogoDark = () => {
  return (
    <div className={styles.logo}>
      <div className={styles.logoIcon}>
        <img src={logoSideBar} alt="Logo" />
      </div>
    </div>
  );
};

export default LogoDark;
