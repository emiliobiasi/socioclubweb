import PropTypes from "prop-types";
import styles from "./CategoryCard.module.css";

const CategoryCard = ({ title, backgroundImage, iconImage }) => {
  return (
    <div className={styles.card}>
      <img
        src={backgroundImage}
        alt="Background"
        className={styles.backgroundImage}
      />
      <img
        src={iconImage}
        alt="Icon"
        className={styles.icon}
      />
      <div className={styles.container}>
        <h3>
          <b>{title}</b>
        </h3>
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  iconImage: PropTypes.string.isRequired,
};

export default CategoryCard;
