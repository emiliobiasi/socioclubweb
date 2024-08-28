import CategoryCard from "../../../components/Cards/CategoryCard";
import Brush from "../../../assets/images/Brush.svg";
import Basketball from "../../../assets/images/Basketball.svg";
import backgroundBasket from "../../../assets/images/backgroundBasket.svg";
import PhotographyBackground from "../../../assets/images/PhotographyBackground.png";
import MusicBackground from "../../../assets/images/MusicBackground.png";
import BrushBackground from "../../../assets/images/BrushBackground.png";
import CarsBackground from "../../../assets/images/CarsBackground.png";
import JoystickBackground from "../../../assets/images/JoystickBackground.png";
import BookWallpaper from "../../../assets/images/BookWallpaper.png";
import FilmBackground from "../../../assets/images/FilmBackground.png";
import MusicNotes from "../../../assets/images/MusicNotes.svg";
import Camera from "../../../assets/images/Camera.svg";
import videoPlay from "../../../assets/images/videoPlay.svg";
import Car from "../../../assets/images/Car.svg";
import Game from "../../../assets/images/Game.svg";
import Teacher from "../../../assets/images/Teacher.svg";
import styles from "./SectionCategory.module.css";

const SectionCategory = () => {
  return (
    <div id="section1" className={styles.container}>
      <h2 className={styles.title}>Categoria De Clubes</h2>
      <div className={styles.cardsRow}>
        <div className={styles.cardColumn}>
          <CategoryCard
            backgroundImage={BrushBackground}
            iconImage={Brush}
            title={"Artes"}
          />
        </div>
        <div className={styles.cardColumn}>
          <CategoryCard
            backgroundImage={backgroundBasket}
            iconImage={Basketball}
            title={"Esporte"}
          />
        </div>
        <div className={styles.cardColumn}>
          <CategoryCard
            backgroundImage={MusicBackground}
            iconImage={MusicNotes}
            title={"Música"}
          />
        </div>
        <div className={styles.cardColumn}>
          <CategoryCard
            backgroundImage={PhotographyBackground}
            iconImage={Camera}
            title={"Fotografia"}
          />
        </div>
        <div className={styles.cardColumn}>
          <CategoryCard
            backgroundImage={FilmBackground}
            iconImage={videoPlay}
            title={"Filmagem"}
          />
        </div>
        <div className={styles.cardColumn}>
          <CategoryCard
            backgroundImage={CarsBackground}
            iconImage={Car}
            title={"Carros"}
          />
        </div>
        <div className={styles.cardColumn}>
          <CategoryCard
            backgroundImage={JoystickBackground}
            iconImage={Game}
            title={"Game"}
          />
        </div>
        <div className={styles.cardColumn}>
          <CategoryCard
            backgroundImage={BookWallpaper}
            iconImage={Teacher}
            title={"Estudos"}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionCategory;
