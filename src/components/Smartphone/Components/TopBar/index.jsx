import styles from "./TopBar.module.css";

const TopBar = () => {
  return (
    <div className={styles.topBar}>
      <img
        className={styles.logo}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg/1200px-Brasao_do_Sao_Paulo_Futebol_Clube.svg.png"
        alt="Logo"
      />
      <h1 className={styles.title}>Nome</h1>
      <i className={`fas fa-user ${styles.iconUser}`}></i>
    </div>
  );
};

export default TopBar;
