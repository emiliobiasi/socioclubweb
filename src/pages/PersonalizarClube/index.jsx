import { useState } from "react";
import { ColorCard } from "../../components/ColorCard";
import NoticiaScreen from "../../components/Smartphone/SmartphoneScreens/NoticiasScreen";
import { useAuth } from "../../contexts/auth/useAuth";
import styles from "./PersonalizarClube.module.css";
import Button from "../../components/Button";
import ClubService from "../../services/club.service";
import ProdutosScreen from "../../components/Smartphone/SmartphoneScreens/ProdutosScreen";
import Alert from "../../components/Alertas/Alert";

const PersonalizarClube = () => {
  const { auth } = useAuth();
  const clubInfo = auth?.club;
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertProps, setAlertProps] = useState({
    type: "success",
    message: "",
  });

  const showAlert = (type, message) => {
    setAlertProps({ type, message });
    setAlertVisible(true);
  };

  // Mova todos os hooks useState para o topo, antes do retorno condicional
  const [name] = useState(clubInfo?.name || "");
  const [titleColor, setTitleColor] = useState(clubInfo?.titles_color || "");
  const [subtitleColor, setSubtitleColor] = useState(
    clubInfo?.subtitles_color || ""
  );
  const [buttonColor, setButtonColor] = useState(clubInfo?.buttons_color || "");
  const [primaryColor, setPrimaryColor] = useState(clubInfo?.palette_1 || "");
  const [secondaryColor, setSecondaryColor] = useState(
    clubInfo?.palette_2 || ""
  );
  const [alternativeColor, setAlternativeColor] = useState(
    clubInfo?.palette_3 || ""
  );

  if (!clubInfo) {
    return <p>Informações do clube não disponíveis.</p>;
  }

  const handleUpdateColors = async () => {
    if (clubInfo) {
      const updatedColors = {
        titles_color: titleColor,
        subtitles_color: subtitleColor,
        buttons_color: buttonColor,
        palette_1: primaryColor,
        palette_2: secondaryColor,
        palette_3: alternativeColor,
      };

      try {
        await ClubService.updateColorScheme(clubInfo.id, updatedColors);
        showAlert("success", "Cores atualizadas com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar as cores:", error);
        showAlert("error", "Erro ao atualizar as cores.");
      }
    }
  };

  return (
    <div className={styles.personalizarContainer}>
      <h1>Personalizar Clube</h1>
      {alertVisible && (
        <Alert
          type={alertProps.type}
          message={alertProps.message}
          onClose={() => setAlertVisible(false)}
        />
      )}
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div>
            <ColorCard
              title="Cor dos Títulos"
              color={titleColor}
              onColorChange={setTitleColor}
            />
            <ColorCard
              title="Cor de Subtítulos"
              color={subtitleColor}
              onColorChange={setSubtitleColor}
            />
            <ColorCard
              title="Cor dos Botões"
              color={buttonColor}
              onColorChange={setButtonColor}
            />
          </div>
          <div>
            <ColorCard
              title="Cor Primária"
              color={primaryColor}
              onColorChange={setPrimaryColor}
            />
            <ColorCard
              title="Cor Secundária"
              color={secondaryColor}
              onColorChange={setSecondaryColor}
            />
            <ColorCard
              title="Cor Alternativa"
              color={alternativeColor}
              onColorChange={setAlternativeColor}
            />
          </div>
        </div>

        <div className={styles.rightColumn}>
          {/* Tela de Noticias */}
          <NoticiaScreen
            Name={name}
            ButtonColor={buttonColor}
            SubtitleColor={subtitleColor}
            TitleColor={titleColor}
            PrimaryColor={primaryColor}
            SecondaryColor={secondaryColor}
          />
          <ProdutosScreen
            Name={name}
            ButtonColor={buttonColor}
            SubtitleColor={subtitleColor}
            TitleColor={titleColor}
            PrimaryColor={primaryColor}
            SecondaryColor={secondaryColor}
          />
        </div>

        <div className={styles.buttonContainer}>
          <Button onClick={handleUpdateColors} className={styles.saveButton}>
            Salvar Cores
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalizarClube;
