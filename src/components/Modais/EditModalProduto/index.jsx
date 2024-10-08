import PropTypes from "prop-types";
import InputField from "../../Inputs/InputField";
import styles from "./EditModalProduto.module.css";

const EditModalProduto = ({
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
        <h2 className={styles.title}>Editar Plano</h2>
        <div className={styles.formulario}>
          <InputField
            label="Nome do plano"
            type="text"
            value={name}
            onChange={onChangeName}
            labelColor={"#fff"}
          />
          <InputField
            label="Preço do plano"
            type="text"
            value={price}
            onChange={onChangePrice}
            labelColor={"#fff"}
          />
          <label className={styles.label}>
            Descricao do Plano
          </label>
          <textarea
            className={styles.text_area}
            // value={text}
            // onChange={(e) => setText(e.target.value)}
            rows={5}
            required
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

EditModalProduto.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onChangePrice: PropTypes.func.isRequired,
};

export default EditModalProduto;
