import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/auth/useAuth";
import styles from "./GerenciamentoEventos.module.css";
import Button from "../../components/Button";
import { CiCirclePlus } from "react-icons/ci";
import EventService from "../../services/event.service";
import EventCard from "../../components/Cards/EventCard";

const GerenciamentoEventos = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { auth } = useAuth();
  const clubId = auth?.club?.id;

  useEffect(() => {
    const fetchEvents = async () => {
      if (clubId) {
        try {
          setLoading(true);
          const eventsData = await EventService.getEventsByClubId(clubId);

          // Verifique se eventsData é um array antes de definir
          if (Array.isArray(eventsData)) {
            setEvents(eventsData);
          } else {
            console.error(
              "Erro: Dados de eventos não são um array:",
              eventsData
            );
            setError("Erro ao obter os eventos. Tente novamente.");
          }

          console.log(eventsData);
        } catch (err) {
          console.error("Erro ao obter os eventos:", err);
          setError("Erro ao obter os eventos. Por favor, tente novamente.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEvents();
  }, [clubId]);

  const handleAddEvent = () => {
    console.log("Função de adicionar evento foi chamada");
  };

  return (
    <div>
      <div className={styles.title}>
        <h1>Gerenciamento de Eventos</h1>
        <div className={styles.button}>
          <Button
            buttonSize="btn--small"
            icon={<CiCirclePlus size={30} />}
            onClick={handleAddEvent}
          >
            Adicionar Evento
          </Button>
        </div>
      </div>
      <div className={styles.container}>
        {loading && <p>Carregando eventos...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && Array.isArray(events) && events.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          !loading && <p>Nenhum evento encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default GerenciamentoEventos;
