import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./ProductCard.module.css";
import InputField from "../../Inputs/InputField";
import ProductService from "../../../services/product.service";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const { id, name, description, price, image } = product;
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEditClick = () => {
    setEditModalOpen(true);
    onEdit();
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await ProductService.deleteProduct(id);
      setDeleteModalOpen(false);
      onDelete(id); // Chama a função onDelete após a exclusão
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  return (
    <div className={styles.card}>
      <img
        // src={image || "https://via.placeholder.com/150"}
        src={"https://via.placeholder.com/150"}
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
            <div className={styles.formulario}>
              <InputField
                label="Nome do produto"
                type="text"
                value={name}
                onChange={""} // Aqui você pode passar a função para lidar com as mudanças
                labelColor={"#fff"}
              />
              <InputField
                label="Descrição do produto"
                type="text"
                value={description}
                onChange={""} // Aqui você pode passar a função para lidar com as mudanças
                labelColor={"#fff"}
              />
              <InputField
                label="Preço do produto"
                type="text"
                value={price}
                onChange={""} // Aqui você pode passar a função para lidar com as mudanças
                labelColor={"#fff"}
              />
            </div>
            <div className={styles.modalActions}>
              <button
                className={styles.modalButton}
                onClick={() => setEditModalOpen(false)}
              >
                Confirmar
              </button>
              <button
                className={styles.modalButton}
                onClick={() => setEditModalOpen(false)}
              >
                Cancelar
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
            <div className={styles.modalActions}>
              <button
                className={styles.modalButton}
                onClick={confirmDelete} // Chama a função de confirmação de exclusão
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
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired, // Adiciona a prop onDelete como obrigatória
};

export default ProductCard;
