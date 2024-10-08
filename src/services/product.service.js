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
  



  return axios.post(API_URL + "createProduct", {
    name,
    description,
    price: parseInt(price, 10),
    image,
    category_id: parseInt(fk_ProductCategory_id, 10),
    club_id: parseInt(fk_Club_id, 10),
  });
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
