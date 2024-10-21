import PropTypes from "prop-types";
import styles from "./ProdutoCard.module.css";

const ProdutoCard = ({
  productName,
  price,
  imageUrl,
  SecondaryColor,
  TitleColor,
  SubtitleColor,
}) => {
  const backgroundColor = SecondaryColor || "#253341";
  const titleColor = TitleColor || "#fff";
  const subTitleColor = SubtitleColor || "#fff";

  return (
    <div className={styles.card} style={{ backgroundColor: backgroundColor }}>
      <img className={styles.productImage} src={imageUrl} alt={productName} />
      <div className={styles.cardContent}>
        <h2 className={styles.productName} style={{ color: titleColor }}>
          {productName}
        </h2>
        <div className={styles.priceTag}>
          Preço
        </div>
        <p className={styles.price} style={{ color: subTitleColor }}>
          {price}
        </p>
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
