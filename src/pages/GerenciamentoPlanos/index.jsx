import { useState, useEffect } from "react";
import PlanService from "../../services/plan.service.js";

import PlanCard from "../../components/Cards/PlanCard/index.jsx";
import { useAuth } from "../../contexts/auth/useAuth.jsx";

const examplePlans = [
  {
    id: 1,
    name: "Básico Tricolor",
    description: [
      { ativo: true, descricao: "Descontos de até 10% em ingressos VIP." },
      { ativo: false, descricao: "Pré-venda 48h antes do público geral." },
      { ativo: false, descricao: "Descontos de até 10% em ingressos VIP." },
      { ativo: false, descricao: "Prioridade em jogos decisivos e eventos especiais." },
    ],
    image: "https://storage.googleapis.com/socioclub/plan/1/1.jpeg",
    price: 10.99,
    discount: 5,
    priority: 1,
    club_id: 1,
  },
  {
    id: 2,
    name: "Premium Tricolor",
    description: [
      { ativo: true, descricao: "Descontos de até 10% em ingressos VIP." },
      { ativo: true, descricao: "Pré-venda 48h antes do público geral." },
      { ativo: false, descricao: "Descontos de até 10% em ingressos VIP." },
      { ativo: false, descricao: "Prioridade em jogos decisivos e eventos especiais." },
    ],
    image: "https://storage.googleapis.com/socioclub/plan/2/2.jpeg",
    price: 29.99,
    discount: 10,
    priority: 2,
    club_id: 1,
  },
  {
    id: 3,
    name: "Master Tricolor",
    description: [
      { ativo: true, descricao: "Descontos de até 10% em ingressos VIP." },
      { ativo: true, descricao: "Pré-venda 48h antes do público geral." },
      { ativo: true, descricao: "Descontos de até 10% em produtos." },
      { ativo: true, descricao: "Prioridade em jogos decisivos e eventos especiais." },
    ],
    image: "https://storage.googleapis.com/socioclub/plan/3/3.jpeg",
    price: 49.99,
    discount: 15,
    priority: 3,
    club_id: 1,
  },
];




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
          setPlans(examplePlans); // TODO voltar para "plansData" quando ajustar as descricoes
          console.log(plansData)
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
        <div style={{ display: "flex", flexWrap: "wrap" }}>
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
