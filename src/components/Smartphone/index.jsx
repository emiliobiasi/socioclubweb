import PropTypes from 'prop-types'; // Importando PropTypes
import styles from './Smartphone.module.css';

const Smartphone = ({ children, borderColor, shadowColor }) => {
  return (
    <div 
      className={styles.smartphone} 
      style={{ borderColor, boxShadow: `0 0 10px ${shadowColor}` }}
    >
      <div className={styles.screen}>
        {children}
      </div>
      <div className={styles.homeButton}></div>
    </div>
  );
};

Smartphone.propTypes = {
  children: PropTypes.node.isRequired, // Validação para conteúdo interno
  borderColor: PropTypes.string, // Cor da borda
  shadowColor: PropTypes.string, // Cor da sombra
};

Smartphone.defaultProps = {
  borderColor: '#333', // Cor padrão da borda
  shadowColor: 'rgba(0, 0, 0, 0.2)', // Cor padrão da sombra
};

export default Smartphone;
