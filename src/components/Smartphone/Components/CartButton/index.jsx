import styles from "./CartButton.module.css";

const CartButton = ({ ButtonColor, SecondaryColor }) => {
  const backgroundColor = SecondaryColor || "#253341";
  const buttonColor = ButtonColor || "#fff";

  return (
    <button
      className={styles.cartButton}
      style={{ backgroundColor: backgroundColor }}
    >
      <i
        className={`fas fa-shopping-cart ${styles.icon}`}
        style={{ color: buttonColor }}
      ></i>
    </button>
  );
};

export default CartButton;
