import PropTypes from "prop-types";
import styles from "./DeleteModal.module.css";

const DeleteModal = ({ isOpen, onClose, onConfirm, loading }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2 className={styles.title}>Confirme para excluir</h2>
        <div className={styles.modalActions}>
          <button
            className={styles.modalButton}
            onClick={onConfirm}
            disabled={loading} // Desabilita o botão enquanto está carregando
          >
            {loading ? "Excluindo..." : "Sim"}{" "}
            {/* Mostra um texto de carregamento */}
          </button>
          <button
            className={styles.modalButton}
            onClick={onClose}
            disabled={loading}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  loading: PropTypes.bool, // Adiciona o estado de loading como uma prop
};

export default DeleteModal;
