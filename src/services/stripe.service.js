import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createStripeAccount = async () => {
  try {
    const response = await axios.post(`${API_URL}stripe/account`);
    const { account, error } = response.data;

    if (error) {
      throw new Error("Erro ao criar conta na Stripe: " + error);
    }

    return account;
  } catch (error) {
    console.error("Erro ao criar a conta Stripe:", error);
    throw error;
  }
};

const createAccountLink = async (connectedAccountId) => {
  try {
    const response = await axios.post(`${API_URL}stripe/account_link`, {
      account: connectedAccountId,
    });
    const { url, error } = response.data;

    if (error) {
      throw new Error("Erro ao criar o link da conta na Stripe: " + error);
    }

    return url;
  } catch (error) {
    console.error("Erro ao criar o link da conta Stripe:", error);
    throw error;
  }
};

const updateStripeAccount = async (accountId, businessType = "individual") => {
  try {
    const response = await axios.post(`${API_URL}stripe/account/${accountId}`, {
      business_type: businessType,
    });
    const { account, error } = response.data;

    if (error) {
      throw new Error("Erro ao atualizar a conta Stripe: " + error);
    }

    return account;
  } catch (error) {
    console.error("Erro ao atualizar a conta Stripe:", error);
    throw error;
  }
};

const updateClubStripeId = async (clubId, stripeId) => {
  try {
    const response = await axios.put(`${API_URL}updateStripeId`, {
      club_id: clubId, // Inclui o clubId no corpo da requisição
      stripe_id: stripeId,
    });
    const { club, error } = response.data;

    if (error) {
      throw new Error("Erro ao atualizar o Stripe ID do clube: " + error);
    }

    return club;
  } catch (error) {
    console.error("Erro ao atualizar o Stripe ID do clube:", error);
    throw error;
  }
};

const StripeService = {
  createStripeAccount,
  createAccountLink,
  updateStripeAccount,
  updateClubStripeId,
};

export default StripeService;
