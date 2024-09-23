import { useState } from "react";
import StripeService from "../../services/stripe.service";

const Financeiro = () => {
  const [accountCreatePending, setAccountCreatePending] = useState(false);
  const [accountLinkCreatePending, setAccountLinkCreatePending] =
    useState(false);
  const [accountUpdatePending, setAccountUpdatePending] = useState(false);
  const [connectedAccountUpdated, setConnectedAccountUpdated] = useState(false);
  const [error, setError] = useState(false);
  const [connectedAccountId, setConnectedAccountId] = useState();

  // Função para criar a conta
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

  // Função para criar o link da conta
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

  // Função para atualizar a conta conectada
  const handleUpdateAccount = async () => {
    setAccountUpdatePending(true);
    setError(false);

    try {
      await StripeService.updateStripeAccount(connectedAccountId, "individual");
      setConnectedAccountUpdated(true);
    } catch (error) {
      setError(true);
    } finally {
      setAccountUpdatePending(false);
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

        {/* Botão para criar conta */}
        {!accountCreatePending && !connectedAccountId && (
          <button onClick={handleCreateAccount}>Criar uma conta!</button>
        )}

        {/* Botão para adicionar informações à conta já criada */}
        {connectedAccountId && !accountLinkCreatePending && (
          <button onClick={handleCreateAccountLink}>
            Adicionar informações
          </button>
        )}

        {/* Novo botão para atualizar a conta com novos dados */}
        {connectedAccountId &&
          !accountUpdatePending &&
          !connectedAccountUpdated && (
            <button onClick={handleUpdateAccount}>Atualizar Conta</button>
          )}

        {connectedAccountUpdated && (
          <div className="example-form">
            <h2>O fluxo de integração vai aqui</h2>
          </div>
        )}

        {error && <p className="error">Algo deu errado!</p>}

        {/* Exibição de status */}
        {(connectedAccountId ||
          accountCreatePending ||
          accountLinkCreatePending ||
          accountUpdatePending) && (
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
            {accountUpdatePending && <p>Atualizando a conta...</p>}
            {connectedAccountUpdated && (
              <div>
                <p>
                  O onboarding da conta começou. Determine as{" "}
                  <a
                    href="https://docs.stripe.com/connect/required-verification-information"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    informações necessárias
                  </a>{" "}
                  que você precisa reunir.
                </p>
                <p>
                  Construa um fluxo para que as suas contas conectadas insiram
                  essas informações e as enviem para a Stripe.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="info-callout">
          <p>
            Este é um app de exemplo para onboarding de Connect hospedado no
            Stripe.{" "}
            <a
              href="https://docs.stripe.com/connect/onboarding/quickstart?connect-onboarding-surface=api"
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
