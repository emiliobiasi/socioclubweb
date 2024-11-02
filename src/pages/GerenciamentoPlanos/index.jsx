import { useState, useEffect } from "react";
import PlanService from "../../services/plan.service.js";
import styles from "./GerenciamentoPlanos.module.css";
import PlanCard from "../../components/Cards/PlanCard/index.jsx";
import { useAuth } from "../../contexts/auth/useAuth.jsx";
import Button from "../../components/Button";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const GerenciamentoPlanos = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stripeError, setStripeError] = useState(""); // Estado para erro de Stripe
  const navigate = useNavigate();

  const { auth } = useAuth();
  const stripeId = auth?.club?.stripe_id; // Obter stripe_id do auth

  useEffect(() => {
    const fetchPlans = async () => {
      if (auth?.club?.id) {
        try {
          setLoading(true);
          const plansData = await PlanService.getPlansByClubId(auth.club.id);
          setPlans(plansData);
          console.log(plansData);
        } catch (err) {
          console.error("Erro ao obter os planos:", err);
          setError("Erro ao obter os planos. Por favor, tente novamente.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPlans();
  }, [auth]);

  // Função para remover o plano deletado da lista
  const handleDeletePlan = (deletedPlanId) => {
    setPlans((prevPlans) =>
      prevPlans.filter((plan) => plan.id !== deletedPlanId)
    );
  };

  return (
    <div className={styles.planosContainer}>
      <div className={styles.title}>
        <h1>Gerenciamento de Planos</h1>
        <div className={styles.button}>
          <Button
            buttonSize="btn--small"
            icon={<CiCirclePlus size={30} />}
            onClick={() => {
              if (stripeId) {
                navigate("/criar-plano");
              } else {
                setStripeError(
                  "É necessário configurar a Stripe antes de criar um plano."
                );
              }
            }}
          >
            Adicionar Plano
          </Button>
        </div>
      </div>
      <div className={styles.container}>
        {loading && <p>Carregando planos...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {stripeError && <p style={{ color: "red" }}>{stripeError}</p>}

        {!loading && !error && plans.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onDelete={handleDeletePlan} // Passa a função onDelete para o PlanCard
              />
            ))}
          </div>
        ) : (
          !loading && <p>Nenhum plano encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default GerenciamentoPlanos;
