import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createClub = async (name, email, password, cnpj, address) => {
  return axios.post(API_URL + "createClub", {
    name,
    email,
    password,
    cnpj,
    address,
  });
};

const updateColorScheme = async (club_id, colors) => {
  return axios.put(`${API_URL}updateColorScheme/${club_id}`, {
    titles_color: colors.titles_color,
    subtitles_color: colors.subtitles_color,
    buttons_color: colors.buttons_color,
    palette_1: colors.palette_1,
    palette_2: colors.palette_2,
    palette_3: colors.palette_3,
  });
};

const ClubService = {
  createClub,
  updateColorScheme,
};

export default ClubService;
