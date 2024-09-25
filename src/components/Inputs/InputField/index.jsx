import PropTypes from 'prop-types'; // Importando PropTypes
import styles from './InputField.module.css';

const InputField = ({ label, type, value, onChange, labelColor }) => {
  return (
    <div className={styles.inputField}>
      <label className={styles.label} style={{ color: labelColor }}>
        {label}
      </label>
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        className={styles.inputElement} 
      />
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired, // Validação para 'label'
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  labelColor: PropTypes.string, // Validação para 'labelColor'
};

InputField.defaultProps = {
  type: 'text', // Valor padrão para 'type'
  labelColor: '#333', // Valor padrão para a cor do label (preto)
};

export default InputField;
