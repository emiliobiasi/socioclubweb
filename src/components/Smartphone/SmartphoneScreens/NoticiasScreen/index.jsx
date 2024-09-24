import Smartphone from "../..";
import BottomNavBar from "../../Components/BottonNavBar";
import NoticiaCard from "../../Components/SmartphoneCards/NoticiaCard";
import TopBar from "../../Components/TopBar";
import styles from "./NoticiaScreen.module.css";
import PropTypes from "prop-types";

const NoticiaScreen = ({
  Name,
  PrimaryColor,
  SecondaryColor,
  TitleColor,
  SubtitleColor,
  ButtonColor,
}) => {
  return (
    <>
      <Smartphone PrimaryColor={PrimaryColor}>
        <TopBar Name={Name} TitleColor={TitleColor} PrimaryColor={PrimaryColor} ButtonColor={ButtonColor} />
        <div className={styles.container}>
          <div className={styles.container2}>
            <h2 className={styles.title}>Notícias</h2>
          </div>
          <NoticiaCard
            title="Renda em alta no Paulistão 2024"
            description="O público e a renda no estádio do Morumbi seguem crescendo na temporada."
            creator="São Paulo FC"
            imageUrl="https://saopaulosempre.com.br/wp-content/uploads/2023/11/06-11-Planejamento.jpg"
            SecondaryColor={SecondaryColor}
            TitleColor={TitleColor}
            SubtitleColor={SubtitleColor}
          />
        </div>
        <BottomNavBar ButtonColor={ButtonColor} SecondaryColor={SecondaryColor} />
      </Smartphone>
    </>
  );
};

NoticiaScreen.propTypes = {
  Name: PropTypes.string.isRequired,
  SecondaryColor: PropTypes.string.isRequired,
  PrimaryColor: PropTypes.string.isRequired,
  TitleColor: PropTypes.string.isRequired,
  SubtitleColor: PropTypes.string.isRequired,
  ButtonColor: PropTypes.string.isRequired,
};

export default NoticiaScreen;
