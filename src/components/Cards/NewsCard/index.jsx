import PropTypes from "prop-types";
import styles from "./NewsCard.module.css";
import NewsService from "../../../services/news.service";

const NewsCard = ({ news, onDelete }) => {
  const { id, title, author, publish_date, image, text } = news;

  const handleDelete = async () => {
    try {
      await NewsService.deleteNew(id);
      if (onDelete) {
        onDelete(id);
      }
    } catch (error) {
      console.error("Erro ao deletar a notícia:", error);
    }
  };

  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>Autor: {author}</p>
        <p className={styles.date}>
          Publicado em: {new Date(publish_date).toLocaleDateString()}
        </p>
        <p className={styles.text}>{text.substring(0, 100)}...</p>
      </div>
      <button className={styles.button} onClick={handleDelete}>
        Deletar Notícia
      </button>
    </div>
  );
};

NewsCard.propTypes = {
  news: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publish_date: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func,
};

export default NewsCard;
