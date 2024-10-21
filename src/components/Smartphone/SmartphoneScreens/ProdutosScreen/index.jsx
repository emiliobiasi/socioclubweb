import Smartphone from "../..";
import BottomNavBar from "../../Components/BottonNavBar";
import CartButton from "../../Components/CartButton";
import DropdownButton from "../../Components/DropButton";
import SearchInput from "../../Components/SearchInput";
import ProdutoCard from "../../Components/SmartphoneCards/ProdutoCard copy";
import styles from "./ProdutosScreen.module.css";

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
            productName="Camisa São Paulo II New Balance 24/25"
            price="R$ 380,00"
            imageUrl="https://images.tcdn.com.br/img/img_prod/1141538/camisa_sao_paulo_ii_new_balance_24_25_superbet_listrada_18061_1_28901b9ea6cb2828d13d99fce2afe37a.jpg"
            SecondaryColor={SecondaryColor}
            TitleColor={TitleColor}
            SubtitleColor={SubtitleColor}
          />
          <ProdutoCard
            productName="Camisa São Paulo II New Balance 24/25"
            price="R$ 380,00"
            imageUrl="https://images.tcdn.com.br/img/img_prod/1141538/camisa_sao_paulo_ii_new_balance_24_25_superbet_listrada_18061_1_28901b9ea6cb2828d13d99fce2afe37a.jpg"
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
