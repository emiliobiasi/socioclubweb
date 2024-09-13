import PropTypes from "prop-types";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import styles from "./PlanCard.module.css";

const PlanCard = ({ plan }) => {
  return (
    <div className={styles.planCard}>
      <div className={styles.planHeader}>
        <h2 className={styles.planName}>{plan.name}</h2>
      </div>
      <p className={styles.planPrice}>{plan.price === 0 ? "$ 0.00" : `R$ ${plan.price.toFixed(2)}`}</p>
      <p className={styles.planPriceMonth}>por mês</p>

      {/* Container envolvendo todas as descrições */}
      <div className={styles.planDescriptionContainer}>
        <ul className={styles.planDescriptionList}>
          {plan.description.map((desc, index) => (
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
          ))}
        </ul>
      </div>

      <button className={styles.subscribeButton}>EDITAR</button>
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
  }).isRequired,
};

export default PlanCard;
