import PropTypes from "prop-types";
import styles from "./ProdutoCard.module.css";

const ProdutoCard = ({ productName, price, imageUrl }) => {
  return (
    <div className={styles.card}>
      <img className={styles.productImage} src={imageUrl} alt={productName} />
      <div className={styles.cardContent}>
        <h2 className={styles.productName}>{productName}</h2>
        <div className={styles.priceTag}>Preço</div>
        <p className={styles.price}>{price}</p>
      </div>
    </div>
  );
};

ProdutoCard.propTypes = {
  productName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default ProdutoCard;
