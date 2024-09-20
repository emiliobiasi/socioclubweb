import Smartphone from "../..";
import BottomNavBar from "../../Components/BottonNavBar";
import NoticiaCard from "../../Components/SmartphoneCards";
import TopBar from "../../Components/TopBar";

const NoticiaScreen = () => {
  return (
    <>
      <Smartphone>
        <TopBar />
        <NoticiaCard
          title="Renda em alta no Paulistão 2024"
          description="O público e a renda no estádio do Morumbi seguem crescendo na temporada."
          creator="São Paulo FC"
          imageUrl="https://saopaulosempre.com.br/wp-content/uploads/2023/11/06-11-Planejamento.jpg"
        />
        <BottomNavBar />
      </Smartphone>
    </>
  );
};

export default NoticiaScreen;
