import styles from "./SectionCategoryDestaque.module.css";
import BestCategoryCard from "../../../components/Cards/BestCategoryCard";
import IconFootball from "../../../assets/images/IconFootball.svg";
import IconMusic from "../../../assets/images/IconMusic.svg";
import IconCultura from "../../../assets/images/IconCultura.svg";

const SectionCategoryDestaque = () => {
  return (
    <div id="section3" className={styles.container}>
      <h2 className={styles.title}>Categorias com mais acessos</h2>
      <div className={styles.cardsRow}>
        <div className={styles.cardColumn}>
          <BestCategoryCard
            title="Futebol"
            iconImage={IconFootball}
            description="Clubes relacionados a música"
          />
        </div>
        <div className={styles.cardColumn}>
          <BestCategoryCard
            title="Cultura"
            iconImage={IconCultura}
            description="Clubes relacionados a música"
          />
        </div>
        <div className={styles.cardColumn}>
          <BestCategoryCard
            title="Música"
            iconImage={IconMusic}
            description="Clubes relacionados a música"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionCategoryDestaque;
