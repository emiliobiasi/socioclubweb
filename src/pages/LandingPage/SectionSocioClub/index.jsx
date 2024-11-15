import styles from "./SectionSocioClub.module.css";
import backgroundFootball from "../../../assets/images/backgroundFootball.png"

const SectionSocioClub = () => {
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        {/* Coluna da esquerda */}
        <div className={styles["left-column-section1"]}>
          <h1 className={styles.title}>SOCIOCLUB</h1>
          <p className={styles.description}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequatur sequi deserunt quia perferendis cum ipsam, quos itaque
            quam ex, ipsa molestias facere excepturi accusamus aliquid totam
            ipsum ea harum atque. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Incidunt deserunt eligendi ab neque tempora ad
            illo ipsam cum tenetur sint dolores reiciendis earum voluptatum
            nobis, ut, sit, totam illum fugiat! Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Repudiandae perferendis unde tenetur
            modi repellendus eum a consectetur nemo ea commodi ullam, explicabo
            eos qui? Omnis assumenda laboriosam natus quisquam dolor.
          </p>
          <button>🚀 Começar agora</button>
          <div className={styles["stats-row"]}>
            <div>
              <h2 className = {styles.stats}>5.2m+</h2>
              <p className = {styles.stats}>Total Usuários</p>
            </div>
            <div>
              <h2 className = {styles.stats}>1.1k+</h2>
              <p className = {styles.stats}>Total Clubes</p>
            </div>
          </div>
        </div>

        {/* Coluna da direita */}
        <div className={styles["right-column"]}>
          <img
            src={backgroundFootball}
            alt="Soccer Team"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionSocioClub;
