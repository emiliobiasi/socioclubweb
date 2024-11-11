import React, { useState } from "react";
import StripeService from "../../services/stripe.service"; // Ajuste o caminho conforme necessário

const OpenDashboardButton = ({
  accountId,
  buttonClassName,
  onAccountNotConfigured,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenDashboard = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const loginUrl = await StripeService.createLoginLink(accountId);
      window.location.href = loginUrl;
    } catch (error) {
      console.error("Erro ao abrir o dashboard:", error);

      // Chama a função passada via props para notificar o componente pai em qualquer erro
      if (onAccountNotConfigured) {
        onAccountNotConfigured();
      }

      // Exibe a mensagem de erro
      setError("Não foi possível abrir o dashboard da Stripe.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpenDashboard}
        disabled={isLoading}
        className={buttonClassName}
      >
        {isLoading ? "Abrindo Dashboard..." : "Abrir Dashboard da Stripe"}
      </button>
      {error && <p className="error">{error}</p>}
    </>
  );
};

export default OpenDashboardButton;
