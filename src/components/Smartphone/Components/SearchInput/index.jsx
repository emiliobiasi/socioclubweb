import PropTypes from "prop-types";
import styles from "./SearchInput.module.css";

const SearchInput = ({
  placeholder,
  SecondaryColor,
  TitleColor,
  SubtitleColor,
}) => {
  const backgroundColor = SecondaryColor || "#253341";
  const titleColor = TitleColor || "#fff";
  const subTitleColor = SubtitleColor || "#fff";

  return (
    <div
      className={styles.searchContainer}
      style={{ backgroundColor: backgroundColor }}
    >
      <i
        className={`fas fa-search ${styles.searchIcon}`}
        style={{ color: titleColor }}
      ></i>
      <input
        className={styles.searchInput}
        type="text"
        style={{ color: subTitleColor, "--placeholderColor": subTitleColor }}
        placeholder={placeholder}
      />
    </div>
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default SearchInput;
