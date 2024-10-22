import { useState, useEffect } from "react";
import styles from "./CriarPlano.module.css";
import PlanService from "../../services/plan.service.js";
import { useAuth } from "../../contexts/auth/useAuth.jsx";
import ImageService from "../../services/image.service.js"

const CriarPlano = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [priority, setPriority] = useState(0);
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

    if (!name || !description || !image || !price || !clubId) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const timestamp = Date.now();
    const imgName = timestamp + "_" + image.name

    handleImgUrl(imgName);

    try {
      setLoading(true);
      const imgUrl = `https://storage.googleapis.com/socioclub/${imgName}`;

      const response = await PlanService.createPlan(
        name,
        description,
        imgUrl,
        parseFloat(price),
        parseInt(discount, 10),
        parseInt(priority, 10),
        parseInt(clubId, 10)
      );

      if (response.status === 200) {
        setSuccess("Plano criado com sucesso!");
        setName("");
        setDescription("");
        setImage("");
        setPrice(0);
        setDiscount(0);
        setPriority(0);
      } else {
        setError("Erro ao criar o plano. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao criar o plano:", error);
      setError("Erro ao criar o plano. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.criarPlanoContainer}>
      <h1>Criar Plano</h1>

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
          <label>Desconto (%)</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Prioridade</label>
          <input
            type="number"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Criando plano..." : "Criar Plano"}
        </button>
      </form>
    </div>
  );
};

export default CriarPlano;
