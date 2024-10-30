import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/auth/useAuth";
import styles from "./GerenciamentoEventos.module.css";
import Button from "../../components/Button";
import { CiCirclePlus } from "react-icons/ci";
import EventService from "../../services/event.service";
import EventCard from "../../components/Cards/EventCard";
import { useNavigate } from "react-router-dom";

const GerenciamentoEventos = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stripeError, setStripeError] = useState(""); // New state for Stripe error
  const navigate = useNavigate();

  const { auth } = useAuth();
  const clubId = auth?.club?.id;
  const stripeId = auth?.club?.stripe_id; // Get stripe_id from auth

  useEffect(() => {
    const fetchEvents = async () => {
      if (clubId) {
        try {
          setLoading(true);
          const eventsData = await EventService.getEventsByClubId(clubId);

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

  // Function to delete an event and remove it from the state
  const handleDeleteEvent = async (eventId) => {
    try {
      await EventService.deleteEvent(eventId);
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );
    } catch (err) {
      console.error("Erro ao deletar o evento:", err);
      setError("Erro ao deletar o evento. Por favor, tente novamente.");
    }
  };

  return (
    <div>
      <div className={styles.title}>
        <h1>Gerenciamento de Eventos</h1>
        <div className={styles.button}>
          <Button
            buttonSize="btn--small"
            icon={<CiCirclePlus size={30} />}
            onClick={() => {
              if (stripeId) {
                navigate("/criar-evento");
              } else {
                setStripeError(
                  "É necessário configurar a Stripe antes de criar um evento."
                );
              }
            }}
          >
            Adicionar Evento
          </Button>
        </div>
      </div>
      <div className={styles.container}>
        {loading && <p>Carregando eventos...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {stripeError && <p style={{ color: "red" }}>{stripeError}</p>}

        {!loading && !error && Array.isArray(events) && events.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onDelete={() => handleDeleteEvent(event.id)} // Pass the callback to delete
              />
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
