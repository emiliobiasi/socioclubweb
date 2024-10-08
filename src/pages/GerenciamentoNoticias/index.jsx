import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/auth/useAuth";
import styles from "./GerenciamentoNoticias.module.css";
import Button from "../../components/Button";
import { CiCirclePlus } from "react-icons/ci";
import NewsService from "../../services/news.service";
import NewsCard from "../../components/Cards/NewsCard";
import { useNavigate } from "react-router-dom";

const GerenciamentoNoticias = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { auth } = useAuth();
  const clubId = auth?.club?.id;

  useEffect(() => {
    const fetchNews = async () => {
      if (clubId) {
        try {
          setLoading(true);
          const newsData = await NewsService.getNewsByClubId(clubId);
          setNews(newsData);
          console.log(newsData);
        } catch (err) {
          console.error("Erro ao obter as notícias:", err);
          setError("Erro ao obter as notícias. Por favor, tente novamente.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchNews();
  }, [clubId]);

  // Função para deletar uma notícia e remover do estado
  const handleDeleteNews = async (newsId) => {
    try {
      await NewsService.deleteNew(newsId);
      setNews((prevNews) => prevNews.filter((item) => item.id !== newsId));
    } catch (err) {
      console.error("Erro ao deletar a notícia:", err);
      setError("Erro ao deletar a notícia. Por favor, tente novamente.");
    }
  };

  return (
    <div>
      <div className={styles.title}>
        <h1>Gerenciamento de Notícias</h1>
        <div className={styles.button}>
          <Button
            buttonSize="btn--small"
            icon={<CiCirclePlus size={30} />}
            onClick={() => navigate("/criar-noticia")}
          >
            Adicionar Notícia
          </Button>
        </div>
      </div>
      <div className={styles.container}>
        {loading && <p>Carregando notícias...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && news.length > 0 ? (
          <div>
            {news.map((item) => (
              <NewsCard
                key={item.id}
                news={item}
                onDelete={() => handleDeleteNews(item.id)} // Passa o callback para deletar
              />
            ))}
          </div>
        ) : (
          !loading && <p>Nenhuma notícia encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default GerenciamentoNoticias;
