import { useState } from "react";
import StripeService from "../../services/stripe.service";

const Financeiro = () => {
  const [accountCreatePending, setAccountCreatePending] = useState(false);
  const [accountLinkCreatePending, setAccountLinkCreatePending] =
    useState(false);
  const [error, setError] = useState(false);
  const [connectedAccountId, setConnectedAccountId] = useState();

  const handleCreateAccount = async () => {
    setAccountCreatePending(true);
    setError(false);

    try {
      const account = await StripeService.createStripeAccount();
      setConnectedAccountId(account);
    } catch (error) {
      setError(true);
    } finally {
      setAccountCreatePending(false);
    }
  };

  const handleCreateAccountLink = async () => {
    setAccountLinkCreatePending(true);
    setError(false);

    try {
      const url = await StripeService.createAccountLink(connectedAccountId);
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      setError(true);
    } finally {
      setAccountLinkCreatePending(false);
    }
  };

  return (
    <div className="container">
      <div className="banner">
        <h1>Financeiro</h1>
      </div>
      <div className="content">
        {!connectedAccountId && <h2>Prepare-se para a decolagem</h2>}
        {!connectedAccountId && (
          <p>SocioClub: junte-se à nossa comunidade de clubes.</p>
        )}
        {connectedAccountId && (
          <h2>Adicione informações para começar a aceitar pagamentos</h2>
        )}
        {connectedAccountId && (
          <p>
            SocioClub faz parceria com a Stripe para ajudar você a receber
            pagamentos e manter seu banco pessoal e detalhes seguros.
          </p>
        )}
        {!accountCreatePending && !connectedAccountId && (
          <button onClick={handleCreateAccount}>Criar uma conta!</button>
        )}
        {connectedAccountId && !accountLinkCreatePending && (
          <button onClick={handleCreateAccountLink}>
            Adicionar informações
          </button>
        )}
        {error && <p className="error">Algo deu errado!</p>}
        {(connectedAccountId ||
          accountCreatePending ||
          accountLinkCreatePending) && (
          <div className="dev-callout">
            {connectedAccountId && (
              <p>
                Seu ID de conta conectada é:{" "}
                <code className="bold">{connectedAccountId}</code>
              </p>
            )}
            {accountCreatePending && <p>Criando uma conta conectada...</p>}
            {accountLinkCreatePending && (
              <p>Criando um novo link de conta...</p>
            )}
          </div>
        )}
        <div className="info-callout">
          <p>
            Este é um app de exemplo para onboarding de Connect hospedado no
            Stripe.{" "}
            <a
              href="https://docs.stripe.com/connect/onboarding/quickstart?connect-onboarding-surface=hosted"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver documentação
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Financeiro;
