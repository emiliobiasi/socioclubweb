import { useState, useEffect } from "react";
import styles from "./CriarEvento.module.css";
import { useAuth } from "../../contexts/auth/useAuth.jsx";
import EventService from "../../services/event.service.js";

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

  useEffect(() => {
    if (auth?.club?.id) {
      setClubId(auth.club.id);
    }
  }, [auth]);

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

    try {
      setLoading(true);

      const response = await EventService.createEvent(
        name,
        description,
        image,
        parseFloat(price),
        date,
        parseInt(ticketsAway, 10),
        parseInt(ticketsHome, 10),
        parseInt(clubId, 10)
      );

      if (response.message === "Evento criado com sucesso!") {
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
          <label>Imagem (URL)</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
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
          <label>Data do Evento</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Ingressos para visitantes</label>
          <input
            type="number"
            value={ticketsAway}
            onChange={(e) => setTicketsAway(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Ingressos para residentes</label>
          <input
            type="number"
            value={ticketsHome}
            onChange={(e) => setTicketsHome(e.target.value)}
            required
          />
        </div>

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
