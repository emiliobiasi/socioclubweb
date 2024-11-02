import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/auth/useAuth";
import styles from "./GerenciamentoProdutos.module.css";
import Button from "../../components/Button";
import { CiCirclePlus } from "react-icons/ci";
import ProductService from "../../services/product.service";
import ProductCard from "../../components/Cards/ProductCard";
import { useNavigate } from "react-router-dom";

const GerenciamentoProdutos = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stripeError, setStripeError] = useState(""); // Estado para erro de Stripe
  const navigate = useNavigate();

  const { auth } = useAuth();
  const clubId = auth?.club?.id;
  const stripeId = auth?.club?.stripe_id; // Obter stripe_id do auth

  useEffect(() => {
    const fetchProducts = async () => {
      if (clubId) {
        try {
          setLoading(true);
          const productsData = await ProductService.getProductsByClubId(clubId);
          setProducts(productsData);
          console.log(productsData);
        } catch (err) {
          console.error("Erro ao obter os produtos:", err);
          setError("Erro ao obter os produtos. Por favor, tente novamente.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, [clubId]);

  // Função para remover o produto do estado
  const handleDelete = async (productId) => {
    try {
      await ProductService.deleteProduct(productId); // Deleta o produto no backend
      setProducts(
        (prevProducts) =>
          prevProducts.filter((product) => product.id !== productId) // Atualiza a lista de produtos no estado
      );
    } catch (err) {
      console.error("Erro ao deletar o produto:", err);
      setError("Erro ao deletar o produto. Por favor, tente novamente.");
    }
  };

  return (
    <div className={styles.produtosContainer}>
      <div className={styles.title}>
        <h1>Gerenciamento de Produtos</h1>
        <div className={styles.button}>
          <Button
            buttonSize="btn--small"
            icon={<CiCirclePlus size={30} />}
            onClick={() => {
              if (stripeId) {
                navigate("/criar-produto");
              } else {
                setStripeError(
                  "É necessário configurar a Stripe antes de criar um produto."
                );
              }
            }}
          >
            Adicionar Produto
          </Button>
        </div>
      </div>
      <div className={styles.container}>
        {loading && <p>Carregando produtos...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {stripeError && <p style={{ color: "red" }}>{stripeError}</p>}

        {!loading && !error && products.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={() => handleDelete(product.id)} // Passa a função de deletar
              />
            ))}
          </div>
        ) : (
          !loading && <p>Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default GerenciamentoProdutos;
