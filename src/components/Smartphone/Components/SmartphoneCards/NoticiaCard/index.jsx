import PropTypes from "prop-types";
import styles from "./NoticiaCard.module.css";

const NoticiaCard = ({ title, description, creator, imageUrl, SecondaryColor, TitleColor, SubtitleColor }) => {

  const backgroundColor = SecondaryColor || "#253341";
  const titleColor = TitleColor || "#fff";
  const subTitleColor = SubtitleColor || "#fff";

  return (
    <div className={styles.newsCard} style={{ backgroundColor: backgroundColor }}>
      <img className={styles.newsImage} src={imageUrl} alt="News" />
      <div className={styles.newsContent}>
        <h2 className={styles.newsTitle} style={{ color: titleColor }}>{title}</h2>
        <p className={styles.newsDescription} style={{ color: subTitleColor }}>{description}</p>
        <span className={styles.newsCreator} style={{ color: subTitleColor }}>Por {creator}</span>
      </div>
    </div>
  );
};

NoticiaCard.propTypes = {
  title: PropTypes.string.isRequired,
  TitleColor: PropTypes.string.isRequired,
  SubtitleColor: PropTypes.string.isRequired,
  SecondaryColor: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default NoticiaCard;
