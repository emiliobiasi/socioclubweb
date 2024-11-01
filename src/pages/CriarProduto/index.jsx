import { useState, useEffect } from "react";
import styles from "./CriarProduto.module.css";
import { useAuth } from "../../contexts/auth/useAuth.jsx";
import ProductService from "../../services/product.service.js";
import ImageService from "../../services/image.service.js";
import InputField from "../../components/Inputs/InputField/index.jsx";

import {
  faTag,
  faFileAlt,
  faImage,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

const CriarProduto = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { auth } = useAuth();
  const [clubId, setClubId] = useState("");
  const [stripeAccountId, setStripeAccountId] = useState("");

  useEffect(() => {
    if (auth?.club?.id) {
      setClubId(auth.club.id);
    }

    if (auth?.club?.stripe_id) {
      setStripeAccountId(auth.club.stripe_id);
    }
  }, [auth]);

  const handleUpload = async (imgUrl) => {
    if (!image) return;

    const uploadResponse = await fetch(imgUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: image,
    });

    if (!uploadResponse.ok) {
      throw new Error("Erro ao fazer upload da imagem.");
    }
  };

  const handleImgUrl = async (imageName) => {
    const response = await ImageService.generateImageUrl(imageName);

    await handleUpload(response.data.url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !description || !price || !image || !clubId || !categoryId) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const timestamp = Date.now();
    const imgName = timestamp + "_" + image.name;

    try {
      setLoading(true);

      await handleImgUrl(imgName);

      const imgUrl = `https://storage.googleapis.com/socioclub/${imgName}`;

      console.log("Stripe ID no Criar Produto: ", stripeAccountId);

      // Inclua o stripeAccountId ao chamar createProduct
      const response = await ProductService.createProduct(
        name,
        description,
        parseFloat(price),
        imgUrl,
        parseInt(clubId, 10),
        parseInt(categoryId, 10),
        stripeAccountId
      );

      if (response.existingProduct) {
        setSuccess("Produto criado com sucesso!");
        setName("");
        setDescription("");
        setPrice(0);
        setImage("");
        setCategoryId("");
      } else {
        setError("Erro ao criar o produto. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao criar o produto:", error);
      setError("Erro ao criar o produto. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.criarProdutoContainer}>
      <h1>Criar Produto</h1>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <InputField
          label="Nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={faTag}
          required
        />

        <InputField
          label="Descrição"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          icon={faFileAlt}
          required
        />

        <InputField
          label="Imagem (Arquivo)"
          type="file"
          onChange={(file) => setImage(file)}
          icon={faImage}
          required
        />

        <InputField
          label="Preço"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          icon={faDollarSign}
          step="0.01"
          required
        />

        <InputField
          label="Selecione uma opção"
          type="dropdown"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          options={[
            { name: "Vestimenta", value: "1" },
            { name: "Brinquedo", value: "2" },
            { name: "Utensilio", value: "3" },
          ]}
        />

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Criando produto..." : "Criar Produto"}
        </button>
      </form>
    </div>
  );
};

export default CriarProduto;
