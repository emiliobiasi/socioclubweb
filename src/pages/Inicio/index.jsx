import { useAuth } from "../../contexts/auth/useAuth";
import styles from "./Inicio.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CompleteCadastro from "../../components/Forms/CompleteCadastro";

const Inicio = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [cadastroCompleto, setCadastroCompleto] = useState(false);

  const clubInfo = auth?.club;

  const isCadastroIncompleto =
    !clubInfo?.description ||
    !clubInfo?.logo ||
    !clubInfo?.background ||
    !clubInfo?.club_category;

  const handleCadastroCompleto = () => {
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
      <div className={styles.clubbackground}>
        <img src={clubInfo?.background} alt="Background do clube" />
      </div>

      <div className={styles.profileSection}>
        {clubInfo?.logo && (
          <div className={styles.logoContainer}>
            <img
              src={clubInfo.logo}
              alt="Logo do clube"
              className={styles.logo}
            />
          </div>
        )}

        <div className={styles.userInfo}>
          <h2 className={styles.username}>
            {clubInfo?.name || "Nome usuário"}
          </h2>
          <p className={styles.description}>
            {clubInfo?.description || "Descrição"}
          </p>
          <p className={styles.address}>{clubInfo?.address || "Endereço"}</p>
        </div>

        {/* <button className={styles.editButton}>Editar perfil</button> */}

        <div className={styles.quickAccessSection}>
          <h2>Acesso rápido</h2>
          <div className={styles.buttonsContainer}>
            <button
              className={styles.quickButton}
              onClick={() => navigate("/personalizar-clube")}
            >
              Personalizar
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
        </div>
      </div>
    </div>
  );
};

export default Inicio;
