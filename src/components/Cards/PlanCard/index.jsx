import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./PlanCard.module.css";
import EditModalProduto from "../../Modais/EditModalProduto";
import DeleteModal from "../../Modais/DeleteModal";
import PlanService from "../../../services/plan.service";

const PlanCard = ({ plan, onDelete }) => {
  const { id, name, description, price, priority } = plan;
  const shadowClass = `shadowPriority${priority}`;
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await PlanService.deletePlan(id); // Chama o serviço de deleção com o ID do plano
      setDeleteModalOpen(false); // Fecha o modal após a deleção
      if (onDelete) {
        onDelete(id); // Chama o callback de onDelete passado pelo pai para remover o plano
      }
    } catch (error) {
      console.error("Erro ao deletar plano:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.planCard} ${styles[shadowClass]}`}>
      <div className={styles.planHeader}>
        <h2 className={styles.planName}>{name}</h2>
      </div>
      <p className={styles.planPrice}>
        {price === 0 ? "R$ 0,00" : `R$ ${price.toFixed(2)}`}
      </p>
      <p className={styles.planPriceMonth}>por mês</p>

      <div className={styles.planDescriptionContainer}>
        <ul className={styles.planDescriptionList}>{description}</ul>
      </div>

      <div className={styles.containerButton}>
        {isEditModalOpen && (
          <EditModalProduto
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            name={name}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={confirmDelete} // Chama a função confirmDelete ao confirmar
            loading={loading} // Passa o estado de loading para o modal
          />
        )}

        <button className={styles.subscribeButton} onClick={handleEditClick}>
          EDITAR
        </button>
        <button
          className={styles.subscribeButton}
          onClick={handleDeleteClick}
          disabled={loading}
        >
          {loading ? "Deletando..." : "DELETAR"}
        </button>
      </div>
    </div>
  );
};

PlanCard.propTypes = {
  plan: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    priority: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func, // Função callback opcional para deletar o plano da lista
};

export default PlanCard;
