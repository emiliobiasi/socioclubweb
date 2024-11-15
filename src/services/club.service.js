import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// cores padrão
const titles_color = "#FFFFFF";
const subtitles_color = "#FFFFFF";
const buttons_color = "#3F85E7";
const palette_1 = "#001628";
const palette_2 = "#283E5A";
const palette_3 = "#080063";

const createClub = async (name, email, password, cnpj, address) => {
  return axios.post(API_URL + "createClub", {
    name,
    email,
    password,
    cnpj,
    address,
    titles_color,
    subtitles_color,
    buttons_color,
    palette_1,
    palette_2,
    palette_3,
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

const setUpClub = async (club_id, description, logo, background_img) => {
  return axios.put(`${API_URL}setupClub/${club_id}`, {
    description: description,
    logo: logo,
    background_img: background_img,
    club_category: '1'
  });
}

const ClubService = {
  createClub,
  updateColorScheme,
  setUpClub
};

export default ClubService;
