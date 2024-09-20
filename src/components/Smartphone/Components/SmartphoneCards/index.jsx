import PropTypes from "prop-types";
import styles from "./NoticiaCard.module.css";

const NoticiaCard = ({ title, description, creator, imageUrl }) => {
  return (
    <div className={styles.newsCard}>
      <img className={styles.newsImage} src={imageUrl} alt="News" />
      <div className={styles.newsContent}>
        <h2 className={styles.newsTitle}>{title}</h2>
        <p className={styles.newsDescription}>{description}</p>
        <span className={styles.newsCreator}>Por {creator}</span>
      </div>
    </div>
  );
};

NoticiaCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default NoticiaCard;
