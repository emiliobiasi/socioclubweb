import PropTypes from "prop-types";
import styles from "./TopBar.module.css";
import logo from "../../../../assets/images/escudo-generico.png"

const TopBar = ({ Name, PrimaryColor, ButtonColor, TitleColor }) => {

  const buttonColor = ButtonColor || "#fff";
  const titleColor = TitleColor || "#fff";

  return (
    <div className={styles.topBar} style={{ backgroundColor: PrimaryColor }}>
      <img
        className={styles.logo}
        src={logo}
        alt="Logo"
      />
      <h1 className={styles.title} style={{ color: titleColor }}>{Name}</h1>
      <i
        className={`fas fa-user ${styles.iconUser}`}
        style={{ color: buttonColor }}
      ></i>
    </div>
  );
};

TopBar.propTypes = {
  Name: PropTypes.string,
  TitleColor: PropTypes.string,
  PrimaryColor: PropTypes.string,
  ButtonColor: PropTypes.string,
};

TopBar.defaultProps = {
  backgroundColor: "rgba(21, 32, 43, 1)",
};

export default TopBar;
