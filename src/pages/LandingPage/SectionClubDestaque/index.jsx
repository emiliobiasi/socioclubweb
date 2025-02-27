import styles from "./SectionClubDestaque.module.css";
import BestClubsCard from "../../../components/Cards/BestClubsCard";

const SectionClubDestaque = () => {
  return (
    <div id="section2" className={styles.container}>
      
        <h2 className={styles.title}>Clubes Em Destaque</h2>
      
        <div className={styles.cardsRow}>
          <div className={styles.cardColumn}>
            <BestClubsCard
              backgroundImage={
                "https://yt3.googleusercontent.com/C8rCyrTuhCFBj7U0Od4-4ISbgp5i7OMfAudqi2h7vgcFOy70J6pSao6qG0YO6p7LpdTqlqbceQ=s900-c-k-c0x00ffffff-no-rj"
              }
              description={"Esporte ⚽"}
              followers={"1.000"}
              iconImage={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjCzKoHvGZzgGXlF6deMhhn-lfJceYhar0Jg&s"
              }
              members={"200"}
              title={"São Paulo"}
            />
          </div>
          <div className={styles.cardColumn}>
            <BestClubsCard
              backgroundImage={
                "https://www.casaca.com.br/site/wp-content/uploads/2017/10/papal-de-parede-do-vasco-da-gama-wallpaper-14.jpg"
              }
              description={"Esporte ⚽"}
              followers={"1.000"}
              iconImage={
                "https://logodownload.org/wp-content/uploads/2016/09/vasco-logo-0.png"
              }
              members={"200"}
              title={"Vasco da Gama"}
            />
          </div>
          <div className={styles.cardColumn}>
            <BestClubsCard
              backgroundImage={
                "https://portaleducacao.guarulhos.sp.gov.br/siseduc/media/django-summernote/2020-12-29/e810522c-e8ea-4490-b165-efa38fb9ce25.jpeg"
              }
              description={"Estudos 🎓"}
              followers={"1.000"}
              iconImage={
                "https://cdn-icons-png.flaticon.com/512/196/196363.png"
              }
              members={"200"}
              title={"Clube do Livro"}
            />
          </div>
        </div>
    </div>
  );
};

export default SectionClubDestaque;
