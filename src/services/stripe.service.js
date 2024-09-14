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

const StripeService = {
  createStripeAccount,
  createAccountLink,
};

export default StripeService;
