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

const PlanService = {
  createPlan,
};

export default PlanService;
