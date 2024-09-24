import PropTypes from "prop-types"; // Importando PropTypes
import styles from "./Smartphone.module.css";

const Smartphone = ({ children, borderColor, shadowColor, PrimaryColor }) => {

  const backgroundColor = PrimaryColor || "#15202B";

  return (
    <div
      className={styles.smartphone}
      style={{ borderColor, boxShadow: `15px 15px 10px ${shadowColor}`, backgroundColor: backgroundColor }}
    >
      <div className={styles.screen}>{children}</div>
      <div className={styles.homeButton}>
        <div className={styles.sound}></div>
        <div className={styles.camera}></div>
      </div>
    </div>
  );
};

Smartphone.propTypes = {
  children: PropTypes.node.isRequired, // Validação para conteúdo interno
  borderColor: PropTypes.string, // Cor da borda
  shadowColor: PropTypes.string, // Cor da sombra
  PrimaryColor: PropTypes.string, // Cor da sombra
};

Smartphone.defaultProps = {
  borderColor: "#333", // Cor padrão da borda
  shadowColor: "rgba(0, 0, 0, 0.2)", // Cor padrão da sombra
};

export default Smartphone;
