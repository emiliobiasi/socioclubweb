import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./ProductCard.module.css";
import ProductService from "../../../services/product.service";
import EditModal from "../../Modais/DeleteModal";
import DeleteModal from "../../Modais/EditModal";

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
        src={image}
        alt={name}
        className={styles.image}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/150"; // URL da imagem padrão
        }}
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
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          name={name}
          description={description}
          price={price}
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
