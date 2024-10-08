import PropTypes from "prop-types";
import styles from "./EventCard.module.css";
import { useState } from "react";
import EventService from "../../../services/event.service";
import DeleteModal from "../../Modais/DeleteModal";

const EventCard = ({ event, onDelete }) => {
  const { id, eventName, description, eventDate, fullPrice, image } = event;
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await EventService.deleteEvent(id);
      if (onDelete) {
        onDelete(id);
      }
    } catch (error) {
      console.error("Erro ao deletar o evento:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <img src={image} alt={eventName} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.name}>{eventName}</h3>
        <p className={styles.description}>{description}</p>
        <p className={styles.date}>
          Data: {new Date(eventDate).toLocaleDateString()}
        </p>
        {/* <p className={styles.location}>Local: {location}</p> */}
        <p className={styles.price}>Preço: R$ {(fullPrice / 100).toFixed(2)}</p>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
      <button
        className={styles.button}
        onClick={handleDeleteClick}
        disabled={loading}
      >
        {loading ? "Deletando..." : "Deletar Evento"}
      </button>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    eventName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    eventDate: PropTypes.string.isRequired,
    // location: PropTypes.string.isRequired,
    fullPrice: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func,
};

export default EventCard;
