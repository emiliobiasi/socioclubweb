import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createProduct = async (
  name,
  description,
  price,
  image,
  fk_Club_id,
  fk_ProductCategory_id
) => {
  try {
    // Primeiro, cria o produto e preço na Stripe
    const stripeProductResponse = await axios.post(
      API_URL + "stripe/create_product",
      {
        name,
        price: parseInt(price, 10),
        currency: "usd",
      }
    );

    const { product_id: stripeProductId, price_id: stripePriceId } =
      stripeProductResponse.data;

    console.log("Produto e preço criados na Stripe:", {
      stripeProductId,
      stripePriceId,
    });

    // Caso o produto na Stripe seja criado com sucesso, cria o produto no sistema existente
    const existingProductResponse = await axios.post(
      API_URL + "createProduct",
      {
        name,
        description,
        price: parseInt(price, 10),
        image,
        category_id: parseInt(fk_ProductCategory_id, 10),
        club_id: parseInt(fk_Club_id, 10),
      }
    );

    const { id: socioclubId } = existingProductResponse.data; // Assume que o retorno tem um campo 'id'

    console.log("Produto criado no sistema:", socioclubId);

    // Agora faz a vinculação chamando a rota '/vinculate'
    await axios.post(API_URL + "stripe/vinculate", {
      socioclub_id: parseInt(socioclubId), // ID do produto criado no sistema
      stripe_id: stripeProductId, // ID do produto criado no Stripe
      price_id: stripePriceId, // ID do preço criado no Stripe
    });
    console.log("Produto vinculado com sucesso entre o sistema e Stripe.");

    // Retorna todas as respostas
    return {
      stripeProduct: stripeProductResponse.data,
      existingProduct: existingProductResponse.data,
    };
  } catch (error) {
    console.error("Erro ao criar o produto e vincular:", error);
    throw error;
  }
};

const getProductsByClubId = async (fk_Club_id) => {
  try {
    const response = await axios.get(
      `${API_URL}getProductsByClubId/${fk_Club_id}`
    );
    return response.data.products;
  } catch (error) {
    console.error("Erro ao obter os produtos:", error);
    throw error;
  }
};

const deleteProduct = async (product_id) => {
  try {
    const response = await axios.delete(
      `${API_URL}deleteProduct/${product_id}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar o produto:", error);
    throw error;
  }
};

const ProductService = {
  createProduct,
  getProductsByClubId,
  deleteProduct,
};

export default ProductService;
