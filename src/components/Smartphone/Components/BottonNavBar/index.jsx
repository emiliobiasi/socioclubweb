import styles from "./BottomNavBar.module.css";

const BottomNavBar = () => {
  return (
    <div className={styles.navBar}>
      <div className={styles.navItem}>
        <i className="fas fa-home"></i>
      </div>
      <div className={styles.navItem}>
        <i className="fas fa-search"></i>
      </div>
      <div className={styles.navItem}>
        <i className="fas fa-bell"></i>
      </div>
      <div className={styles.navItem}>
        <i className="fas fa-user"></i>
      </div>
    </div>
  );
};

export default BottomNavBar;
