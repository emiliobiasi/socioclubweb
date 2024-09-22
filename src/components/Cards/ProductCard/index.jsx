import PropTypes from "prop-types";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const { name, description, price, image } = product;

  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
        <p className={styles.price}>R$ {price / 100}</p>{" "}
      </div>
      <button className={styles.button}>Ver Detalhes</button>
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
};

export default ProductCard;
