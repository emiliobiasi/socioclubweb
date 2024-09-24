import PropTypes from "prop-types";
import styles from "./TopBar.module.css";

const TopBar = ({ Name, PrimaryColor, ButtonColor, TitleColor }) => {

  const buttonColor = ButtonColor || "#fff";
  const titleColor = TitleColor || "#fff";

  return (
    <div className={styles.topBar} style={{ backgroundColor: PrimaryColor }}>
      <img
        className={styles.logo}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg/1200px-Brasao_do_Sao_Paulo_Futebol_Clube.svg.png"
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
