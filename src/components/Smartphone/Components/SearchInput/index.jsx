import PropTypes from "prop-types";
import styles from "./SearchInput.module.css";

const SearchInput = ({ placeholder }) => {
  return (
    <div className={styles.searchContainer}>
      <i className={`fas fa-search ${styles.searchIcon}`}></i>
      <input
        className={styles.searchInput}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default SearchInput;
