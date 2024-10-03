import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createEvent = async (
  eventName,
  description,
  image,
  price,
  date,
  tickets_away,
  tickets_home,
  club_id
) => {
  try {
    const response = await axios.post(API_URL + "createEvent", {
      eventName,
      description,
      image,
      fullPrice: parseFloat(price),
      eventDate: date,
      ticketsAway: parseInt(tickets_away),
      ticketsHome: parseInt(tickets_home),
      fkClubId: parseInt(club_id, 10),
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Erro inesperado ao criar o evento");
    }
  } catch (error) {
    console.error("Erro ao criar o evento:", error);
    throw error;
  }
};

const getEventsByClubId = async (club_id) => {
  try {
    const response = await axios.get(`${API_URL}getEventsByClubId/${club_id}`);
    return response.data.events;
  } catch (error) {
    console.error("Erro ao obter os eventos:", error);
    throw error;
  }
};

const deleteEvent = async (event_id) => {
  try {
    const response = await axios.delete(`${API_URL}deleteEvent/${event_id}`);
    if (response.status === 200) {
      return response.data.message;
    } else {
      throw new Error("Erro inesperado ao deletar o evento");
    }
  } catch (error) {
    console.error("Erro ao deletar o evento:", error);
    throw error;
  }
};

const EventService = {
  createEvent,
  getEventsByClubId,
  deleteEvent,
};

export default EventService;
