import { useState, useEffect } from "react";
import styles from "./CriarProduto.module.css";
import { useAuth } from "../../contexts/auth/useAuth.jsx";
import ProductService from "../../services/product.service.js";
import ImageService from "../../services/image.service.js"

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

  useEffect(() => {
    if (auth?.club?.id) {
      setClubId(auth.club.id);
    }
  }, [auth]);


  const handleUpload = async (imgUrl) => {
    if (!image) return;

    console.log('oi')

    const uploadResponse = await fetch(imgUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: image,
    });

    console.log(uploadResponse);
  };

  const handleImgUrl = async (imageName) => {
    const response = await ImageService.generateImageUrl(
      imageName
    );

    handleUpload(response.data.url);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");


    if (!name || !description || !price || !image || !clubId || !categoryId) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    

    const timestamp = Date.now();
    const imgName = timestamp + "_" + image.name

    console.log(imgName)

    handleImgUrl(imgName);

    try {
      setLoading(true);
      const imgUrl = `https://storage.googleapis.com/socioclub/${imgName}`;


      const response = await ProductService.createProduct(
        name,
        description,
        parseFloat(price),
        imgUrl,
        parseInt(clubId, 10),
        parseInt(categoryId, 10)
      );

      if (response.status === 200) {
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
        <div className={styles.inputGroup}>
          <label>Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Descrição</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Imagem (Arquivo)</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Preço</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Categoria do Produto (ID)</label>
          <input
            type="number"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          />
        </div>

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
