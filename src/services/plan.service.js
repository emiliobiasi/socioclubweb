import axios from "axios";
import StripeService from "./stripe.service";

const API_URL = import.meta.env.VITE_API_URL;

const createPlan = async (
  name,
  description,
  image,
  price,
  discount,
  priority,
  club_id,
  stripeAccountId 
) => {
  try {
    // Primeiro, cria o produto e o preço de assinatura na Stripe
    const stripeProductData = await StripeService.createSubscriptionInStripe(
      name,
      parseInt(price * 100, 10), // Converter para centavos
      "brl", // Moeda
      "month", // Intervalo de recorrência (ex: 'month', 'year')
      stripeAccountId
    );

    const { product_id: stripeProductId, price_id: stripePriceId } =
      stripeProductData;

    console.log("Produto e preço de assinatura criados na Stripe:", {
      stripeProductId,
      stripePriceId,
    });

    // Em seguida, cria o plano no seu sistema
    const response = await axios.post(`${API_URL}createPlan`, {
      name,
      description,
      image,
      price: parseFloat(price),
      discount: parseInt(discount, 10),
      priority: parseInt(priority, 10),
      club_id: parseInt(club_id, 10),
    });

    const { id: planId } = response.data; // Assume que a resposta inclui o ID do plano

    console.log("Plano criado no sistema:", planId);

    // Agora, vincula o plano com o produto e o preço da Stripe
    await StripeService.vinculateProduct(
      parseInt(planId),
      stripeProductId,
      stripePriceId,
      3
    );

    // Retorna as respostas
    return {
      stripeProduct: stripeProductData,
      plan: response.data,
    };
  } catch (error) {
    console.error("Erro ao criar o plano e vincular:", error);
    throw error;
  }
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
