import PropTypes from "prop-types";
import styles from "./DropdownButton.module.css";

const DropdownButton = ({ label }) => {
  return (
    <button className={styles.dropdownButton}>
      {label}
      <i className={`fas fa-chevron-down ${styles.icon}`}></i>
    </button>
  );
};

DropdownButton.propTypes = {
  label: PropTypes.string.isRequired,
};

export default DropdownButton;
