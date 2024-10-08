import PropTypes from "prop-types";
import InputField from "../../Inputs/InputField";
import styles from "./EditModal.module.css";

const EditModal = ({
  isOpen,
  onClose,
  name,
  description,
  price,
  onChangeName,
  onChangeDescription,
  onChangePrice,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContentForm}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2 className={styles.title}>Editar Produto</h2>
        <div className={styles.formulario}>
          <InputField
            label="Nome do produto"
            type="text"
            value={name}
            onChange={onChangeName}
            labelColor={"#fff"}
          />
          <InputField
            label="Descrição do produto"
            type="text"
            value={description}
            onChange={onChangeDescription}
            labelColor={"#fff"}
          />
          <InputField
            label="Preço do produto"
            type="text"
            value={price}
            onChange={onChangePrice}
            labelColor={"#fff"}
          />
        </div>
        <div className={styles.modalActions}>
          <button className={styles.modalButton} onClick={onClose}>
            Confirmar
          </button>
          <button className={styles.modalButton} onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

EditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onChangePrice: PropTypes.func.isRequired,
};

export default EditModal;