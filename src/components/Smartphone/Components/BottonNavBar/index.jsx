import PropTypes from "prop-types";
import styles from "./BottomNavBar.module.css";

const BottomNavBar = ({ ButtonColor, SecondaryColor }) => {
  const backgroundColor = SecondaryColor || "#253341";
  const buttonColor = ButtonColor || "#fff";

  return (
    <div className={styles.navBar} style={{ backgroundColor: backgroundColor }}>
      <div className={styles.navItem} style={{ color: buttonColor }}>
        <i className="fas fa-home"></i>
      </div>
      <div className={styles.navItem} style={{ color: buttonColor }}>
        <i className="fas fa-search"></i>
      </div>
      <div className={styles.navItem} style={{ color: buttonColor }}>
        <i className="fas fa-bell"></i>
      </div>
      <div className={styles.navItem} style={{ color: buttonColor }}>
        <i className="fas fa-user"></i>
      </div>
    </div>
  );
};

BottomNavBar.propTypes = {
  SecondaryColor: PropTypes.string.isRequired,
  ButtonColor: PropTypes.string.isRequired,
};

export default BottomNavBar;
