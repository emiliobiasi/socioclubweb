import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createNews = async (text, image, author, title, fk_Club_id) => {
  return axios.post(API_URL + "createNews", {
    text,
    image,
    author,
    title,
    club_id: parseInt(fk_Club_id, 10),
  });
};

const getNewsByClubId = async (fk_Club_id) => {
  try {
    const response = await axios.get(`${API_URL}getNewsByClubId/${fk_Club_id}`);
    return response.data.news;
  } catch (error) {
    console.error("Erro ao obter as notícias:", error);
    throw error;
  }
};

const deleteNew = async (new_id) => {
  try {
    const response = await axios.delete(`${API_URL}deleteNew/${new_id}`);
    return response.data.message;
  } catch (error) {
    console.error("Erro ao deletar a notícia:", error);
    throw error;
  }
};

const NewsService = {
  createNews,
  getNewsByClubId,
  deleteNew,
};

export default NewsService;
