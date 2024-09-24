import styles from "./CartButton.module.css";

const CartButton = () => {
  return (
    <button className={styles.cartButton}>
      <i className={`fas fa-shopping-cart ${styles.icon}`}></i>
    </button>
  );
};

export default CartButton;
