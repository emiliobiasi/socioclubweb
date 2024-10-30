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

const createProductInStripe = async (
  name,
  price,
  currency,
  stripeAccountId
) => {
  try {
    const response = await axios.post(API_URL + "stripe/create_product", {
      name,
      price,
      currency,
      stripe_account_id: stripeAccountId,
    });

    const { product_id, price_id, error } = response.data;

    if (error) {
      throw new Error("Erro ao criar o produto na Stripe: " + error);
    }

    return { product_id, price_id };
  } catch (error) {
    console.error("Erro ao criar o produto na Stripe:", error);
    throw error;
  }
};

const vinculateProduct = async (socioclubId, stripeId, priceId, isProduct) => {
  try {
    const response = await axios.post(API_URL + "stripe/vinculate", {
      socioclub_id: socioclubId,
      stripe_id: stripeId,
      price_id: priceId,
      is_product: isProduct,
    });

    if (response.data && response.data.message) {
      if (response.data.message.startsWith("Erro")) {
        throw new Error(response.data.message);
      } else {
        console.log(response.data.message);
      }
    } else {
      console.log("Produto vinculado com sucesso entre o sistema e Stripe.");
    }
  } catch (error) {
    console.error("Erro ao vincular o produto:", error);
    throw error;
  }
};

// NOVO MÉTODO: Criação de assinatura
const createSubscriptionInStripe = async (
  name,
  price,
  currency,
  interval,
  stripeAccountId
) => {
  try {
    const response = await axios.post(
      `${API_URL}stripe/create_subscription_product`,
      {
        name,
        price,
        currency,
        interval, // Intervalo da assinatura (ex: 'month', 'year')
        stripe_account_id: stripeAccountId,
      }
    );

    const { product_id, price_id, error } = response.data;

    if (error) {
      throw new Error(
        "Erro ao criar o produto de assinatura na Stripe: " + error
      );
    }

    return { product_id, price_id };
  } catch (error) {
    console.error("Erro ao criar o produto de assinatura na Stripe:", error);
    throw error;
  }
};

// NOVO MÉTODO: Vincular plano
const vinculatePlan = async (planId, stripeId, priceId) => {
  try {
    const response = await axios.post(`${API_URL}stripe/vinculate_plan`, {
      plan_id: planId,
      stripe_id: stripeId,
      price_id: priceId,
    });

    if (response.data && response.data.message) {
      if (response.data.message.startsWith("Erro")) {
        throw new Error(response.data.message);
      } else {
        console.log(response.data.message);
      }
    } else {
      console.log("Plano vinculado com sucesso entre o sistema e Stripe.");
    }
  } catch (error) {
    console.error("Erro ao vincular o plano:", error);
    throw error;
  }
};

const StripeService = {
  createStripeAccount,
  createAccountLink,
  updateStripeAccount,
  updateClubStripeId,
  createProductInStripe,
  vinculateProduct,
  createSubscriptionInStripe,
  vinculatePlan,
};

export default StripeService;
