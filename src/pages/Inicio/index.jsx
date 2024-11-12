import { useAuth } from "../../contexts/auth/useAuth";
import styles from "./Inicio.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CompleteCadastro from "../../components/Forms/CompleteCadastro";

const Inicio = () => {
  const navigate = useNavigate();
  const { logout, auth } = useAuth();
  const [cadastroCompleto, setCadastroCompleto] = useState(false);

  const clubInfo = auth?.club;
  const token = auth?.token;
  const expiresAt = auth?.expiresAt;

  // Verifica se algum campo necessário está vazio
  const isCadastroIncompleto =
    !clubInfo?.description ||
    !clubInfo?.logo ||
    !clubInfo?.background ||
    !clubInfo?.club_category;

  const handleCadastroCompleto = () => {
    // Atualiza o estado para indicar que o cadastro foi completado
    setCadastroCompleto(true);
  };

  if (isCadastroIncompleto && !cadastroCompleto) {
    return (
      <CompleteCadastro
        clubInfo={clubInfo}
        onComplete={handleCadastroCompleto}
      />
    );
  }

  return (
    <div className={styles.container}>
      {/* Background */}
      <div className={styles.clubbackground}>
        <img src={clubInfo?.background} alt="Background do clube" />
      </div>

      <div className={styles.profileSection}>
        {/* Logo */}
        {clubInfo?.logo && (
          <div className={styles.logoContainer}>
            <img
              src={clubInfo.logo}
              alt="Logo do clube"
              className={styles.logo}
            />
          </div>
        )}

        {/* Edit Profile Button */}
        <button className={styles.editButton}>Editar perfil</button>
      </div>
      {/* User Info */}
      <div className={styles.userInfo}>
        <h2 className={styles.username}>{clubInfo?.name || "Nome usuário"}</h2>
        <p className={styles.description}>
          {clubInfo?.description || "Descrição"}
        </p>
        <p className={styles.address}>{clubInfo?.address || "Endereço"}</p>
      </div>

      {/* Quick Access Section */}
      <div className={styles.quickAccessSection}>
        <h2>Acesso rápido</h2>
        <div className={styles.buttonsContainer}>
          <button
            className={styles.quickButton}
            onClick={() => navigate("/personalizar-clube")}
          >
            Personalizar Clube
          </button>
          <button
            className={styles.quickButton}
            onClick={() => navigate("/financeiro")}
          >
            Financeiro
          </button>
          <button
            className={styles.quickButton}
            onClick={() => navigate("/gerenciar-produtos")}
          >
            Produtos
          </button>
        </div>
        <p>Token: {token}</p>
        <p>Expira em: {expiresAt}</p>
        <button onClick={logout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Inicio;
