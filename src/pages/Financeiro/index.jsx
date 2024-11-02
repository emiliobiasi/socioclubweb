import { useState, useEffect } from "react";
import StripeService from "../../services/stripe.service";
import { useAuth } from "../../contexts/auth/useAuth";
import styles from "./Financeiro.module.css"; // Importar o arquivo CSS

const Financeiro = () => {
  const [accountCreatePending, setAccountCreatePending] = useState(false);
  const [accountLinkCreatePending, setAccountLinkCreatePending] =
    useState(false);
  const [accountUpdatePending, setAccountUpdatePending] = useState(false);
  const [connectedAccountUpdated, setConnectedAccountUpdated] = useState(false);
  const [error, setError] = useState(false);
  const [connectedAccountId, setConnectedAccountId] = useState(null);

  const { auth, setAuth } = useAuth();
  const clubId = auth?.club?.id;
  const existingStripeId = auth?.club?.stripe_id;

  useEffect(() => {
    if (existingStripeId) {
      setConnectedAccountId(existingStripeId);
    }
  }, [existingStripeId]);

  const handleCreateAccount = async () => {
    setAccountCreatePending(true);
    setError(false);
    try {
      const account = await StripeService.createStripeAccount();
      setConnectedAccountId(account);
      const updatedClub = await StripeService.updateClubStripeId(
        clubId,
        account
      );
      setAuth((prevAuth) => ({
        ...prevAuth,
        club: updatedClub,
      }));
      localStorage.setItem("club_info", JSON.stringify(updatedClub));
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
    <div className={styles.financeiroContainer}>
      <div className={styles.container}>
        <div className={styles.banner}>
          <h1>Financeiro</h1>
        </div>
        <div className={styles.content}>
          {error && <p className={styles.error}>Algo deu errado!</p>}
          {!connectedAccountId && <h2>Prepare-se para a decolagem</h2>}
          {!connectedAccountId && (
            <p>SocioClub: junte-se à nossa comunidade de clubes.</p>
          )}
          {connectedAccountId && (
            <h2>
              Adicione ou edite informações para começar a aceitar pagamentos
            </h2>
          )}
          {connectedAccountId && (
            <p>
              SocioClub faz parceria com a Stripe para ajudar você a receber
              pagamentos e manter seu banco pessoal e detalhes seguros.
            </p>
          )}

          {!accountCreatePending && !connectedAccountId && (
            <button onClick={handleCreateAccount} className={styles.button}>
              Criar uma conta!
            </button>
          )}

          {connectedAccountId && !accountLinkCreatePending && (
            <button onClick={handleCreateAccountLink} className={styles.button}>
              Adicionar/Editar informações
            </button>
          )}

          {connectedAccountId &&
            !accountUpdatePending &&
            !connectedAccountUpdated && (
              <button onClick={handleUpdateAccount} className={styles.button}>
                Atualizar Conta
              </button>
            )}

          {connectedAccountUpdated && (
            <div className={styles["example-form"]}>
              <h2>O fluxo de integração vai aqui</h2>
            </div>
          )}

          {(connectedAccountId ||
            accountCreatePending ||
            accountLinkCreatePending ||
            accountUpdatePending) && (
            <div className={styles["dev-callout"]}>
              {connectedAccountId && (
                <p>
                  Seu ID de conta conectada é:{" "}
                  <code className={styles.bold}>{connectedAccountId}</code>
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

          <div className={styles["info-callout"]}>
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
    </div>
  );
};

export default Financeiro;
