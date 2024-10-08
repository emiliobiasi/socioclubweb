import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./NewsCard.module.css";
import NewsService from "../../../services/news.service";
import DeleteModal from "../../Modais/EditModal";

const NewsCard = ({ news, onDelete }) => {
  const { id, title, author, publish_date, image, text } = news;

  // Estado para controlar a expansão do texto
  const [isExpanded, setIsExpanded] = useState(false);

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

  // Função para alternar o estado de expansão
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.content_head}>
          <h3 className={styles.title}>{title}</h3>
          {isDeleteModalOpen && (
            <DeleteModal
              isOpen={isDeleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
              onConfirm={handleDelete}
            />
          )}
          <button className={styles.deleteButton} onClick={handleDeleteClick}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
        <p className={styles.author}>Autor: {author}</p>
        <p className={styles.date}>
          Publicado em: {new Date(publish_date).toLocaleDateString()}
        </p>

        {/* Renderiza o texto truncado ou completo baseado no estado de expansão */}
        <p className={styles.text}>
          {isExpanded ? text : `${text.substring(0, 1000)}...`}
        </p>

        {/* Exibe o botão se o texto for maior que 1000 caracteres */}
        {text.length > 1000 && (
          <button className={styles.expandButton} onClick={toggleExpand}>
            {isExpanded ? "Mostrar menos" : "Ler mais"}
          </button>
        )}
      </div>
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
