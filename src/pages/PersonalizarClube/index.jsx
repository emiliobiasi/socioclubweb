import { ColorCard } from "../../components/ColorCard";
import Smartphone from "../../components/Smartphone";
import NoticiaScreen from "../../components/Smartphone/SmartphoneScreens/NoticiasScreen";
import { useAuth } from "../../contexts/auth/useAuth";
import styles from "./PersonalizarClube.module.css"; // Importando o CSS Module


const PersonalizarClube = () => {
  const { auth } = useAuth();
  const clubInfo = auth?.club;

  // Smartphones disponíveis (array com base no mock de clubInfo)
  const smartphones = [
    <Smartphone />,
    <Smartphone />,
    <Smartphone />,
    <Smartphone />,
    <Smartphone />,
    <Smartphone />,
    <Smartphone />,
  ];

  return (
    <>
      <h1>Personalizar Clube</h1>
      {clubInfo ? (
        <div className={styles.container}>
          <div className={styles.leftColumn}>
            <div>
              <ColorCard title="Title color" color={clubInfo.titles_color} />
              <ColorCard
                title="Subtitle color"
                color={clubInfo.subtitles_color}
              />
              <ColorCard title="Button color" color={clubInfo.buttons_color} />
            </div>
            <div>
              <ColorCard title="Primary color" color={clubInfo.palette_1} />
              <ColorCard title="Secondary color" color={clubInfo.palette_2} />
              <ColorCard title="Alternative color" color={clubInfo.palette_3} />
            </div>
          </div>

          <div className={styles.rightColumn}>
            {/* Tela de Noticias */}
            <NoticiaScreen />
          </div>
        </div>
      ) : (
        <p>Informações do clube não disponíveis.</p>
      )}
    </>
  );
};

export default PersonalizarClube;
