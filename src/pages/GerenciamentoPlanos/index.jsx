import { useState, useEffect } from "react";
import PlanService from "../../services/plan.service.js";
import { useAuth } from "../../contexts/AuthContext";
import PlanCard from "../../components/Cards/PlanCard/index.jsx";

const GerenciamentoPlanos = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { auth } = useAuth();

  useEffect(() => {
    const fetchPlans = async () => {
      if (auth?.club?.id) {
        try {
          setLoading(true);
          const plansData = await PlanService.getPlansByClubId(auth.club.id);
          setPlans(plansData);
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

  return (
    <div>
      <h1>Gerenciamento de Planos</h1>

      {loading && <p>Carregando planos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && plans.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      ) : (
        !loading && <p>Nenhum plano encontrado.</p>
      )}
    </div>
  );
};

export default GerenciamentoPlanos;
