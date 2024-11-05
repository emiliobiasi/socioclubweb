import styles from "./Analise.module.css"; // Importar o arquivo CSS

const Analise = () => {
  return (
    <div className={styles.financeiroContainer}>
      <div>
        <div>
          <h1>Analise</h1>
        </div>
        <div className={styles.grid_container}>
          <div className={styles.grid_item}><iframe src="http://192.155.95.53:3000/d-solo/fe2z68m9m251ce/1-quantidade-de-produtos-por-categoria?orgId=1&from=1730756793866&to=1730778393866&panelId=1" width="450" height="200" frameborder="0"></iframe></div>
          <div className={styles.grid_item}><iframe src="http://192.155.95.53:3000/public-dashboards/b0cb228c39b645f29f6638c2b12a93e3" width="450" height="200" frameborder="0"></iframe></div>
          <div className={styles.grid_item}><iframe src="http://192.155.95.53:3000/public-dashboards/333c73ffe74541b7845b483f0eef293c" width="450" height="200" frameborder="0"></iframe></div>
          <div className={styles.grid_item}>4</div>
          <div className={styles.grid_item}>5</div>
          <div className={styles.grid_item}>6</div>
          <div className={styles.grid_item}>7</div>
          <div className={styles.grid_item}>8</div>
          <div className={styles.grid_item}>9</div>
        </div>
      </div>
    </div>
  );
};

export default Analise;
