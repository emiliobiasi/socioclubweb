import PropTypes from "prop-types";
import { useState } from "react";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import styles from "./PlanCard.module.css";
import EditModalProduto from "../../Modais/EditModalProduto";
import DeleteModal from "../../Modais/DeleteModal";

const PlanCard = ({ plan }) => {
  // Determinar a classe de cor e sombra com base na prioridade
  const shadowClass = `shadowPriority${plan.priority}`;
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEditClick = () => {
    setEditModalOpen(true);
    // onEdit();
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      // await ProductService.deleteProduct(id);
      setDeleteModalOpen(false);
      // onDelete(id); // Chama a função onDelete após a exclusão
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  return (
    <div className={`${styles.planCard} ${styles[shadowClass]}`}>
      <div className={styles.planHeader}>
        <h2 className={styles.planName}>{plan.name}</h2>
      </div>
      <p className={styles.planPrice}>
        {plan.price === 0 ? "$ 0.00" : `R$ ${plan.price.toFixed(2)}`}
      </p>
      <p className={styles.planPriceMonth}>por mês</p>

      {/* Container envolvendo todas as descrições */}
      <div className={styles.planDescriptionContainer}>
        <ul className={styles.planDescriptionList}>
          {plan.description}
          {/* {plan.description.map((desc, index) => (
            <li
              key={index}
              className={`${styles.planDescription} ${
                index % 2 === 0 ? styles.altBackground : styles.normalBackground
              }`}
            >
              {desc.ativo ? (
                <FaCheckCircle className={styles.iconActive} />
              ) : (
                <FaTimesCircle className={styles.iconInactive} />
              )}
              {desc.descricao}
            </li>
          ))} */}
        </ul>
      </div>
      <div className={styles.containerButton}>
        {/* Modal de Edição */}
        {isEditModalOpen && (
          <EditModalProduto
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            name={name}
            // description={description}
            // price={price}
            // onChangeName={handleNameChange}
            // onChangeDescription={handleDescriptionChange}
            // onChangePrice={handlePriceChange}
          />
        )}

        {/* Modal de Exclusão */}
        {isDeleteModalOpen && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={confirmDelete}
          />
        )}
        <button className={styles.subscribeButton} onClick={handleEditClick}>EDITAR</button>
        <button className={styles.subscribeButton} onClick={handleDeleteClick}>DELETAR</button>
      </div>
    </div>
  );
};

PlanCard.propTypes = {
  plan: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.arrayOf(
      PropTypes.shape({
        ativo: PropTypes.bool.isRequired,
        descricao: PropTypes.string.isRequired,
      })
    ).isRequired,
    price: PropTypes.number.isRequired,
    priority: PropTypes.number.isRequired,
  }).isRequired,
};

export default PlanCard;
