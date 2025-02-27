// src/pages/Login.jsx
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import LogoTexto from "../../assets/images/LogoTexto.svg";
import BackgoundLogin from "../../assets/images/BackgoundLogin.svg";
import FormLogin from "../../components/Forms/FormLogin";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.cadastroContainer}>
      <div className={styles.leftSection}>
        <img src={LogoTexto} alt="Logo SocioClub" className={styles.logo} />
        <div className={styles.infoSection}>
          <img
            src={BackgoundLogin}
            alt="Imagem de fundo"
            className={styles.infoImage}
          />
          <h1>Acompanhe as últimas notícias do seu clube favorito.</h1>
          <p>
            Se tornando um sócio, além das últimas notícias do seu clube, também
            tenha a possibilidade de comprar produtos com exclusividade.
          </p>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.navigationLinks}>
          <button onClick={() => navigate("/")}>
            <i className="fas fa-chevron-left"></i> Retornar para página inicial
          </button>
          <button onClick={() => navigate("/cadastrar-clube")}>
            Ainda não é um sócio? <strong>CADASTRE-SE AGORA</strong>
          </button>
        </div>
        <FormLogin /> 
      </div>
    </div>
  );
};

export default Login;
