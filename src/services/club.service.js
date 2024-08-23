import axios from "axios"

const API_URL = 'http://localhost:8000/'

const createClub = async (
    name,
    email,
    password,
    cnpj,
    address,
  ) => {
    return axios.post(API_URL + "createClub", {
        name,
        email,
        password,
        cnpj,
        address,
    });
};

const ClubService = {
    createClub
};

export default ClubService