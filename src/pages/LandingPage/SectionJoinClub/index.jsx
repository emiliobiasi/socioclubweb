import styles from "./SectionJoinClubCard.module.css";
import LogoTexto from "../../../assets/images/LogoTexto.svg";
import JoinClubCard from "../../../components/Cards/JoinClubCard";

const SectionJoinClubCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cardsRow}>
        <div className={styles.cardColumn}>
          <JoinClubCard
            logoImage={LogoTexto}
            title="Junte-Se A Nós, Inscreva O Seu Clube"
            description="Crie O Seu Clube E Administre Ele Através Da Nossa Plataforma"
            buttonText="Cadastrar meu clube"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionJoinClubCard;
