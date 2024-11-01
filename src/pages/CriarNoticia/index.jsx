import { useState, useEffect } from "react";
import styles from "./CriarNoticia.module.css";
import { useAuth } from "../../contexts/auth/useAuth.jsx";
import NewsService from "../../services/news.service.js";
import ImageService from "../../services/image.service.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeading,
  faFileAlt,
  faImage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import InputField from "../../components/Inputs/InputField/index.jsx";

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
      setAuthor(auth?.user?.name || "");
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
  };

  const handleImgUrl = async (imageName) => {
    const response = await ImageService.generateImageUrl(imageName);
    handleUpload(response.data.url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!title || !text || !image || !clubId || !author) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const timestamp = Date.now();
    const imgName = timestamp + "_" + image.name;

    handleImgUrl(imgName);

    try {
      setLoading(true);
      const imgUrl = `https://storage.googleapis.com/socioclub/${imgName}`;

      const response = await NewsService.createNews(
        text,
        imgUrl,
        author,
        title,
        parseInt(clubId, 10)
      );

      if (response.status === 200) {
        setSuccess("Notícia criada com sucesso!");
        setTitle("");
        setText("");
        setImage("");
        setAuthor(auth?.user?.name || "");
      } else {
        setError("Erro ao criar a notícia. Tente novamente.");
      }
    } catch (error) {
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
        <InputField
          label="Título"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          icon={faHeading}
          required
        />

        <InputField
          label="Texto da Notícia"
          type="textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          icon={faFileAlt}
          required
        />

        <InputField
          label="Imagem (Arquivo)"
          type="file"
          onChange={(file) => {
            console.log("Arquivo selecionado:", file); // Verificação
            setImage(file);
          }}
          icon={faImage}
          required
        />

        <InputField
          label="Autor"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          icon={faUser}
          required
        />

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
