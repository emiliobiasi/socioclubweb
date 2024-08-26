import Box from "../../components/Boxes/Box";
import BoxRow from "../../components/Boxes/BoxRow";
import CategoryCard from "../../components/Cards/CategoryCard";
import Brush from '../../assets/images/Brush.svg'
import Basketball from '../../assets/images/Basketball.svg'
import backgroundBasket from '../../assets/images/backgroundBasket.svg'
import PhotographyBackground from '../../assets/images/PhotographyBackground.png'
import MusicBackground from '../../assets/images/MusicBackground.png'
import MusicNotes from '../../assets/images/MusicNotes.svg'
import Camera from '../../assets/images/Camera.svg'
import videoPlay from '../../assets/images/videoPlay.svg'
import Car from '../../assets/images/Car.svg'
import Game from '../../assets/images/Game.svg'
import Teacher from '../../assets/images/Teacher.svg'
import styles from "./LandingPage.module.css";

const SectionCategory = () => {
  return (
    <>
      <div id="section1" className={styles["category-cards"]}>
        <h2 className={styles["category-cards-title"]}>Categoria De Clubes</h2>{" "}
      </div>
      <div className={styles.home}>
        <Box
          columns={4}
          rows={2}
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
                  backgroundBasket
                }
                iconImage={Basketball}
                title={"Esporte"}
              />
            </div>
            <div className={styles["box-row-div"]}>
              <CategoryCard
                backgroundImage={
                  MusicBackground
                }
                iconImage={MusicNotes}
                title={"Música"}
              />
            </div>
            <div className={styles["box-row-div"]}>
              <CategoryCard
                backgroundImage={
                  PhotographyBackground
                }
                iconImage={Camera}
                title={"Fotografia"}
              />
            </div>
          </BoxRow>
          <BoxRow>
            <div className={styles["box-row-div"]}>
              <CategoryCard
                backgroundImage={
                  "https://www.w3schools.com/howto/img_avatar.png"
                }
                iconImage={videoPlay}
                title={"Filmagem"}
              />
            </div>
            <div className={styles["box-row-div"]}>
              <CategoryCard
                backgroundImage={
                  "https://www.w3schools.com/howto/img_avatar.png"
                }
                iconImage={Car}
                title={"Carros"}
              />
            </div>
            <div className={styles["box-row-div"]}>
              <CategoryCard
                backgroundImage={
                  "https://www.w3schools.com/howto/img_avatar.png"
                }
                iconImage={Game}
                title={"Game"}
              />
            </div>
            <div className={styles["box-row-div"]}>
              <CategoryCard
                backgroundImage={
                  "https://www.w3schools.com/howto/img_avatar.png"
                }
                iconImage={Teacher}
                title={"Estudos"}
              />
            </div>
          </BoxRow>
        </Box>
      </div>
    </>
  );
};

export default SectionCategory;
