import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/auth/useAuth";
import styles from "./GerenciamentoNoticias.module.css";
import Button from "../../components/Button";
import { CiCirclePlus } from "react-icons/ci";
import NewsService from "../../services/news.service";
import NewsCard from "../../components/Cards/NewsCard";

const GerenciamentoNoticias = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div>
      <div className={styles.title}>
        <h1>Gerenciamento de Notícias</h1>
        <div className={styles.button}>
          <Button buttonSize="btn--small" icon={<CiCirclePlus size={30} />}>
            Adicionar Notícia
          </Button>
        </div>
      </div>
      <div className={styles.container}>
        {loading && <p>Carregando notícias...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && news.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
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
