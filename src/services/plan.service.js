import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createPlan = async (
  name,
  description,
  image,
  price,
  discount,
  priority,
  club_id
) => {
  return axios.post(API_URL + "createPlan", {
    name,
    description,
    image,
    price: parseFloat(price),
    discount: parseInt(discount, 10),
    priority: parseInt(priority, 10),
    club_id: parseInt(club_id, 10),
  });
};

const getPlansByClubId = async (club_id) => {
  try {
    const response = await axios.get(`${API_URL}plans/${club_id}`);
    return response.data.plans;
  } catch (error) {
    console.error("Erro ao obter os planos:", error);
    throw error;
  }
};

const deletePlan = async (plan_id) => {
  try {
    const response = await axios.delete(`${API_URL}deletePlan/${plan_id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar o plano:", error);
    throw error;
  }
};

const PlanService = {
  createPlan,
  getPlansByClubId,
  deletePlan,
};

export default PlanService;
