import Box from "../../components/Boxes/Box";
import BoxRow from "../../components/Boxes/BoxRow";
import CategoryCard from "../../components/Cards/CategoryCard";
import Brush from '../../assets/images/Brush.svg'
import Basketball from '../../assets/images/Basketball.svg'
import MusicNotes from '../../assets/images/MusicNotes.svg'
import styles from "./Home.module.css";

const SectionClubDestaque = () => {
  return (
    <>
      <div id="section2" className={styles["category-cards"]}>
        <h2 className={styles["category-cards-title"]}>Clubes Em Destaque</h2>{" "}
      </div>
      <div className={styles.home}>
        <Box
          columns={3}
          rows={1}
          paddingLeft={"430px"}
          paddingRight={"430px"}
          height={"75.5vh"}
        >
          <BoxRow>
            <div className={styles["box-row-div"]}>
              <CategoryCard
                backgroundImage={
                  "https://www.w3schools.com/howto/img_avatar.png"
                }
                iconImage={Brush}
                title={"Artes"}
              />
            </div>
            <div className={styles["box-row-div"]}>
              <CategoryCard
                backgroundImage={
                  "https://www.w3schools.com/howto/img_avatar.png"
                }
                iconImage={Basketball}
                title={"Esporte"}
              />
            </div>
            <div className={styles["box-row-div"]}>
              <CategoryCard
                backgroundImage={
                  "https://www.w3schools.com/howto/img_avatar.png"
                }
                iconImage={MusicNotes}
                title={"Música"}
              />
            </div>
          </BoxRow>
        </Box>
      </div>
    </>
  );
};

export default SectionClubDestaque;
