import { useState, useEffect } from "react";
import styles from "./CriarNoticia.module.css";
import { useAuth } from "../../contexts/auth/useAuth.jsx";
import NewsService from "../../services/news.service.js";

const CriarNoticia = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { auth } = useAuth();
  const [clubId, setClubId] = useState("");

  useEffect(() => {
    if (auth?.club?.id) {
      setClubId(auth.club.id);
      setAuthor(auth?.user?.name || ""); // Definindo o autor a partir do usuário autenticado
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!title || !text || !image || !clubId || !author) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);

      const response = await NewsService.createNews(
        title,
        text,
        image,
        author,
        parseInt(clubId, 10)
      );

      if (response.status === 200) {
        setSuccess("Notícia criada com sucesso!");
        setTitle("");
        setText("");
        setImage("");
        setAuthor(auth?.user?.name || ""); // Mantém o autor como o usuário autenticado
      } else {
        setError("Erro ao criar a notícia. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao criar a notícia:", error);
      setError("Erro ao criar a notícia. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.criarNoticiaContainer}>
      <h1>Criar Notícia</h1>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Texto da Notícia</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
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
          <label>Autor</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Criando notícia..." : "Criar Notícia"}
        </button>
      </form>
    </div>
  );
};

export default CriarNoticia;
