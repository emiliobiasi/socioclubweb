import { useState, useEffect } from "react";
import styles from "./CriarPlano.module.css";
import PlanService from "../../services/plan.service.js";
import ImageService from "../../services/image.service.js";
import { useAuth } from "../../contexts/auth/useAuth.jsx";
import InputField from "../../components/Inputs/InputField/index.jsx";
import { faTag, faFileAlt, faImage, faDollarSign, faPercent, faSortNumericDown } from "@fortawesome/free-solid-svg-icons";
import Alert from "../../components/Alertas/Alert/index.jsx";

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
  const [stripeAccountId, setStripeAccountId] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertProps, setAlertProps] = useState({
    type: "success",
    message: "",
  });

  const showAlert = (type, message) => {
    setAlertProps({ type, message });
    setAlertVisible(true);
  };

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

    if (!name || !description || !image || !price || !clubId) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const timestamp = Date.now();
    const imgName = timestamp + "_" + image.name;

    try {
      setLoading(true);
      await handleImgUrl(imgName);
      const imgUrl = `https://storage.googleapis.com/socioclub/${imgName}`;

      const response = await PlanService.createPlan(
        name,
        description,
        imgUrl,
        parseFloat(price),
        parseInt(discount, 10),
        parseInt(priority, 10),
        parseInt(clubId, 10),
        stripeAccountId
      );

      if (response.plan) {
        setSuccess("Plano criado com sucesso!");
        setName("");
        setDescription("");
        setImage("");
        setPrice(0);
        setDiscount(0);
        setPriority(0);
        showAlert("success", "Plano criado com sucesso!");
      } else {
        showAlert("error", "Erro ao criar o plano. Tente novamente")
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
      {alertVisible && (
            <Alert
              type={alertProps.type}
              message={alertProps.message}
              onClose={() => setAlertVisible(false)}
            />
          )}

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
          label="Desconto (%)"
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          icon={faPercent}
        />

        <InputField
          label="Prioridade"
          type="number"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          icon={faSortNumericDown}
        />

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
