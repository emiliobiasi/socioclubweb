import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./ProductCard.module.css";
import InputField from "../../Inputs/InputField";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const { name, description, price, image } = product;
  console.log(product);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEditClick = () => {
    setEditModalOpen(true);
    onEdit();
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
    onDelete();
  };

  return (
    <div className={styles.card}>
      <img
        src={
          "https://images.tcdn.com.br/img/img_prod/1141538/camisa_sao_paulo_ii_new_balance_24_25_superbet_listrada_18061_1_28901b9ea6cb2828d13d99fce2afe37a.jpg"
        }
        alt={name}
        className={styles.image}
      />
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.team}>
          <span className={styles.teamDescription}>{description}</span>
        </div>
        <div className={styles.priceActions}>
          <div>
            <p className={styles.tagPrice}>Preço</p>
            <p className={styles.price}>R$ {price}</p>
          </div>
          <div className={styles.actions}>
            <button className={styles.editButton} onClick={handleEditClick}>
              <i className="fas fa-edit"></i>
            </button>
            <button className={styles.deleteButton} onClick={handleDeleteClick}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Edição */}
      {isEditModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContentForm}>
            <span
              className={styles.close}
              onClick={() => setEditModalOpen(false)}
            >
              &times;
            </span>
            <h2>Editar Produto</h2>
            <p></p> {/* Linha horizontal já está aplicada no CSS */}
            {/* Formulário de edição */}
            <div className={styles.formulario}>
              <InputField
                label="Nome do produto"
                type="text"
                value={""}
                onChange={""}
                labelColor={"#fff"}
              />
              <InputField
                label="Descrição do produto"
                type="text"
                value={""}
                onChange={""}
                labelColor={"#fff"}
              />
              <InputField
                label="Preço do produto"
                type="text"
                value={""}
                onChange={""}
                labelColor={"#fff"}
              />
            </div>
            <div className={styles.modalActions}>
              <button
                className={styles.modalButton}
                onClick={() => setDeleteModalOpen(false)}
              >
                Sim
              </button>
              <button
                className={styles.modalButton}
                onClick={() => setDeleteModalOpen(false)}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Exclusão */}
      {isDeleteModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span
              className={styles.close}
              onClick={() => setDeleteModalOpen(false)}
            >
              &times;
            </span>
            <h2>Confirme para excluir</h2>
            <p></p> {/* Linha horizontal já está aplicada no CSS */}
            <div className={styles.modalActions}>
              <button
                className={styles.modalButton}
                onClick={() => setDeleteModalOpen(false)}
              >
                Sim
              </button>
              <button
                className={styles.modalButton}
                onClick={() => setDeleteModalOpen(false)}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductCard;
