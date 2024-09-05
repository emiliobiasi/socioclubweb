import PropTypes from "prop-types";
import styles from "./PlanCard.module.css";

const PlanCard = ({ plan }) => {
  return (
    <div className={styles.planCard}>
      <h2 className={styles.planName}>{plan.name}</h2>
      <p className={styles.planDescription}>{plan.description}</p>
      <img src={plan.image} alt={plan.name} className={styles.planImage} />
      <p className={styles.planPrice}>Preço: R$ {plan.price.toFixed(2)}</p>
      <p className={styles.planDiscount}>Desconto: {plan.discount}%</p>
      <p className={styles.planPriority}>Prioridade: {plan.priority}</p>
    </div>
  );
};

// Validação das props usando PropTypes
PlanCard.propTypes = {
  plan: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    priority: PropTypes.number.isRequired,
  }).isRequired,
};

export default PlanCard;
