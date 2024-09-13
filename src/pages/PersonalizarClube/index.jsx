import { ColorCard } from "../../components/ColorCard";
import { useAuth } from "../../contexts/auth/useAuth";

const PersonalizarClube = () => {
  const { auth } = useAuth();
  const clubInfo = auth?.club;

  return (
    <>
      <h1>Personalizar Clube</h1>
      {clubInfo ? (
        <div>
          <div style={{ marginTop: "20px" }}>
            <ColorCard title="Title color" color={clubInfo.titles_color} />
            <ColorCard
              title="Subtitle color"
              color={clubInfo.subtitles_color}
            />
            <ColorCard title="Button color" color={clubInfo.buttons_color} />
          </div>
          <div style={{ marginTop: "20px" }}>
            <ColorCard title="Primary color" color={clubInfo.palette_1} />
            <ColorCard title="Secondary color" color={clubInfo.palette_2} />
            <ColorCard title="Alternative color" color={clubInfo.palette_3} />
          </div>
        </div>
      ) : (
        <p>Informações do clube não disponíveis.</p>
      )}
    </>
  );
};

export default PersonalizarClube;
