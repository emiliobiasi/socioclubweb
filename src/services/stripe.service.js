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

const vinculateProduct = async (socioclubId, stripeId, priceId, column) => {
  try {
    console.log("Vinculando produto entre o sistema e Stripe...");
    console.log("socioclubId:", socioclubId);
    console.log("stripeId:", stripeId);
    console.log("priceId:", priceId);
    console.log("column:", column);
    const response = await axios.post(API_URL + "stripe/vinculate", {
      socioclub_id: socioclubId,
      stripe_id: stripeId,
      price_id: priceId,
      column: column,
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

const createAccountSession = async (accountId) => {
  try {
    const response = await axios.post(
      `${API_URL}stripe/create_account_session`,
      {
        account_id: accountId,
      }
    );
    const { client_secret } = response.data;
    return client_secret;
  } catch (error) {
    console.error("Erro ao criar o client_secret da AccountSession:", error);
    throw error;
  }
};

const createLoginLink = async (accountId) => {
  try {
    const response = await axios.post(`${API_URL}stripe/create_login_link`, {
      account_id: accountId,
    });
    const { login_url, error } = response.data;

    if (error) {
      throw new Error("Erro ao criar o login link na Stripe: " + error);
    }

    return login_url;
  } catch (error) {
    console.error("Erro ao criar o login link na Stripe:", error);
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
  createAccountSession,
  createLoginLink
};

export default StripeService;
