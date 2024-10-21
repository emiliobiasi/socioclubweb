import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const generateImageUrl = async (
  filename
) => {
  return axios.post(API_URL + "generate-img-url", {
    filename
  });
};

const ImageService = {
    generateImageUrl
}

export default ImageService;
