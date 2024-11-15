import Smartphone from "../..";
import BottomNavBar from "../../Components/BottonNavBar";
import CartButton from "../../Components/CartButton";
import DropdownButton from "../../Components/DropButton";
import SearchInput from "../../Components/SearchInput";
import ProdutoCard from "../../Components/SmartphoneCards/ProdutoCard copy";
import styles from "./ProdutosScreen.module.css";
import camisa1 from "../../../../assets/images/camisa-1.png";
import camisa2 from "../../../../assets/images/camisa-2.png";

const ProdutosScreen = ({
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
        <div className={styles.container}>
          <h2 className={styles.title}>Produtos</h2>
          <SearchInput
            placeholder="Busca de produtos..."
            SecondaryColor={SecondaryColor}
            TitleColor={TitleColor}
            SubtitleColor={SubtitleColor}
          />
          <div className={styles.container2}>
            <CartButton
              ButtonColor={ButtonColor}
              SecondaryColor={SecondaryColor}
            />
            <DropdownButton
              label="Categorias"
              ButtonColor={ButtonColor}
              SecondaryColor={SecondaryColor}
              TitleColor={TitleColor}
            />
          </div>
          <ProdutoCard
            productName="Camisa Oficial Preta"
            price="R$ 380,00"
            imageUrl={camisa1}
            SecondaryColor={SecondaryColor}
            TitleColor={TitleColor}
            SubtitleColor={SubtitleColor}
          />
          <ProdutoCard
            productName="Camisa de Treino Vermelha e Branca"
            price="R$ 380,00"
            imageUrl={camisa2}
            SecondaryColor={SecondaryColor}
            TitleColor={TitleColor}
            SubtitleColor={SubtitleColor}
          />
        </div>
        <BottomNavBar
          ButtonColor={ButtonColor}
          SecondaryColor={SecondaryColor}
        />
      </Smartphone>
    </>
  );
};

export default ProdutosScreen;
