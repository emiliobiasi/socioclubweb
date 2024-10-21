import PropTypes from "prop-types";
import styles from "./DropdownButton.module.css";

const DropdownButton = ({ label, ButtonColor, SecondaryColor, TitleColor }) => {
  const backgroundColor = SecondaryColor || "#253341";
  const buttonColor = ButtonColor || "#fff";
  const titleColorColor = TitleColor || "#fff";

  return (
    <button
      className={styles.dropdownButton}
      style={{ backgroundColor: backgroundColor, color: titleColorColor }}
    >
      {label}
      <i
        className={`fas fa-chevron-down ${styles.icon}`}
        style={{ color: buttonColor }}
      ></i>
    </button>
  );
};

DropdownButton.propTypes = {
  label: PropTypes.string.isRequired,
};

export default DropdownButton;
