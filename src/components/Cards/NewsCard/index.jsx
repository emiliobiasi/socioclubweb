import PropTypes from "prop-types";
import styles from "./NewsCard.module.css";

const NewsCard = ({ news }) => {
  const { title, author, publish_date, image, text } = news;

  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>Autor: {author}</p>
        <p className={styles.date}>Publicado em: {new Date(publish_date).toLocaleDateString()}</p>
        <p className={styles.text}>{text.substring(0, 100)}...</p>
      </div>
      <button className={styles.button}>Ler mais</button>
    </div>
  );
};

// Definindo os tipos esperados para as props usando PropTypes
NewsCard.propTypes = {
  news: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publish_date: PropTypes.string.isRequired, // Verificar se o formato é string
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default NewsCard;
