import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// const createEvent = async (
//   name,
//   description,
//   date,
//   image,
//   location,
//   price,
//   club_id
// ) => {
//   try {
//     const response = await axios.post(API_URL + "createEvent", {
//       name,
//       description,
//       date,
//       image,
//       location,
//       price: parseFloat(price),
//       club_id: parseInt(club_id, 10),
//     });
//     return response.data; // Retorna a resposta do servidor
//   } catch (error) {
//     console.error("Erro ao criar o evento:", error);
//     throw error; // Lança o erro para ser tratado pelo chamador da função
//   }
// };

const getEventsByClubId = async (club_id) => {
  try {
    const response = await axios.get(`${API_URL}getEventsByClubId/${club_id}`);
    return response.data.events;
  } catch (error) {
    console.error("Erro ao obter os eventos:", error);
    throw error;
  }
};

const EventService = {
  //   createEvent,
  getEventsByClubId,
};

export default EventService;
