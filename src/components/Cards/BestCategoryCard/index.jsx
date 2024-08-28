import PropTypes from 'prop-types';
import styles from './BestCategoryCard.module.css';

const BestCategoryCard = ({ title, iconImage, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        <img src={iconImage} alt="Icon" className={styles.icon} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

BestCategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  iconImage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default BestCategoryCard;
