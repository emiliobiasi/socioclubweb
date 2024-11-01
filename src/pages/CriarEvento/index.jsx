import { useState, useEffect } from "react";
import styles from "./CriarEvento.module.css";
import { useAuth } from "../../contexts/auth/useAuth.jsx";
import EventService from "../../services/event.service.js";
import ImageService from "../../services/image.service.js";
import InputField from "../../components/Inputs/InputField/index.jsx";
import {
  faTag,
  faFileAlt,
  faImage,
  faDollarSign,
  faCrown,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const CriarEvento = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [ticketsAway, setTicketsAway] = useState(0);
  const [ticketsHome, setTicketsHome] = useState(0);
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

    if (
      !name ||
      !description ||
      !price ||
      !image ||
      !date ||
      !ticketsAway ||
      !ticketsHome ||
      !clubId
    ) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const timestamp = Date.now();
    const imgName = timestamp + "_" + image.name;

    try {
      setLoading(true);

      await handleImgUrl(imgName);

      const imgUrl = `https://storage.googleapis.com/socioclub/${imgName}`;

      console.log("Stripe ID no Criar Evento: ", stripeAccountId);

      // Include stripeAccountId when calling createEvent
      const response = await EventService.createEvent(
        name,
        description,
        imgUrl,
        parseFloat(price),
        date,
        parseInt(ticketsAway, 10),
        parseInt(ticketsHome, 10),
        parseInt(clubId, 10),
        stripeAccountId // Pass the stripeAccountId here
      );

      if (response.existingEvent) {
        setSuccess("Evento criado com sucesso!");
        setName("");
        setDescription("");
        setPrice(0);
        setImage("");
        setDate("");
        setTicketsAway(0);
        setTicketsHome(0);
      } else {
        setError("Erro ao criar o evento. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao criar o evento:", error);
      setError("Erro ao criar o evento. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.criarEventoContainer}>
      <h1>Criar Evento</h1>

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
          label="Selecione uma data"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <InputField
          label="Ingressos para visitantes"
          type="number"
          icon={faUsers}
          value={ticketsAway}
          onChange={(e) => setTicketsAway(e.target.value)}
        />

        <InputField
          label="Ingressos para residentes"
          icon={faCrown}
          type="number"
          value={ticketsHome}
          onChange={(e) => setTicketsHome(e.target.value)}
        />

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Criando evento..." : "Criar Evento"}
        </button>
      </form>
    </div>
  );
};

export default CriarEvento;
