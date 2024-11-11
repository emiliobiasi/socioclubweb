import { useState, useEffect } from "react";
import StripeService from "../../services/stripe.service";
import { useAuth } from "../../contexts/auth/useAuth";
import styles from "./Financeiro.module.css";
import OpenDashboardButton from "../../components/OpenDashBoardButton/OpenDashBoardButton";

const Financeiro = () => {
  const [accountCreatePending, setAccountCreatePending] = useState(false);
  const [accountLinkCreatePending, setAccountLinkCreatePending] =
    useState(false);
  const [error, setError] = useState(false);
  const [connectedAccountId, setConnectedAccountId] = useState(null);
  const [showAddEditButton, setShowAddEditButton] = useState(false);

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

  const handleAccountNotConfigured = () => {
    // Atualiza o estado para mostrar o botão "Adicionar/Editar informações"
    setShowAddEditButton(true);
  };

  return (
    <div className={styles.financeiroContainer}>
      <div className={styles.container}>
        <div className={styles.banner}>
          <h1>Financeiro</h1>
        </div>
        <div className={styles.content}>
          {error && <p className={styles.error}>Algo deu errado!</p>}
          {!connectedAccountId && (
            <>
              <h2>
                Conecte sua conta SocioClub ao serviço parceiro da Stripe!
              </h2>
              <p>
                SocioClub: junte-se à nossa comunidade de clubes, você poderá
                disponibilizar produtos, planos e eventos de seu clube!
              </p>
            </>
          )}
          {connectedAccountId && (
            <>
              <h2>Bem-vindo ao seu painel financeiro!</h2>
              <p>
                Acesse o Dashboard da Stripe para gerenciar seus pagamentos e
                informações.
              </p>

              <div className={styles.buttonContainer}>
                {showAddEditButton && !accountLinkCreatePending && (
                  <button
                    onClick={handleCreateAccountLink}
                    className={styles.button}
                  >
                    Adicionar/Editar informações
                  </button>
                )}

                <OpenDashboardButton
                  accountId={connectedAccountId}
                  buttonClassName={styles.button}
                  onAccountNotConfigured={handleAccountNotConfigured}
                />
              </div>
            </>
          )}

          {!accountCreatePending && !connectedAccountId && (
            <button onClick={handleCreateAccount} className={styles.button}>
              Criar uma conta!
            </button>
          )}

          {(connectedAccountId ||
            accountCreatePending ||
            accountLinkCreatePending) && (
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Financeiro;
