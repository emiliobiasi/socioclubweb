import axios from "axios";
import StripeService from "./stripe.service";

const API_URL = import.meta.env.VITE_API_URL;

const createProduct = async (
  name,
  description,
  price,
  image,
  fk_Club_id,
  fk_ProductCategory_id,
  stripeAccountId
) => {
  try {
    // Primeiro, cria o produto e preço na Stripe usando o StripeService
    const stripeProductData = await StripeService.createProductInStripe(
      name,
      parseInt(price * 100, 10), // Converter para centavos
      "brl", // Ou "brl", se preferir
      stripeAccountId
    );

    const { product_id: stripeProductId, price_id: stripePriceId } =
      stripeProductData;

    console.log("Produto e preço criados na Stripe:", {
      stripeProductId,
      stripePriceId,
    });

    // Em seguida, cria o produto no seu sistema existente
    const existingProductResponse = await axios.post(
      API_URL + "createProduct",
      {
        name,
        description,
        price: parseFloat(price),
        image,
        category_id: parseInt(fk_ProductCategory_id, 10),
        club_id: parseInt(fk_Club_id, 10),
      }
    );

    const { id: socioclubId } = existingProductResponse.data; // Assume que o retorno tem um campo 'id'

    console.log("Produto criado no sistema:", socioclubId);

    // Agora faz a vinculação chamando a função do StripeService
    await StripeService.vinculateProduct(
      parseInt(socioclubId),
      stripeProductId,
      stripePriceId
    );

    // Retorna as respostas
    return {
      stripeProduct: stripeProductData,
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
