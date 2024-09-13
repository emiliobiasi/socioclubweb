import { useState } from "react";
import InputField from "../../Inputs/InputField/index.jsx";
import styles from "./FormLogin.module.css";
import { useAuth } from "../../../contexts/auth/useAuth.jsx";


const FormLogin = () => {
  const [emailClube, setEmailClube] = useState("");
  const [senhaAcesso, setSenhaAcesso] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!emailClube || !senhaAcesso) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);
      await login(emailClube, senhaAcesso);
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      setError("Erro ao realizar login. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.formLogin} onSubmit={handleSubmit}>
      <h2>ENTRE E GERENCIE SUA PLATAFORMA</h2>
      <p>CONTINUE ADMINISTRANDO E PERSONALIZANDO SEU SOCIO CLUB</p>

      {error && <p className={styles.error}>{error}</p>}

      <InputField
        label="E-mail do Clube"
        type="email"
        value={emailClube}
        onChange={(e) => setEmailClube(e.target.value)}
      />

      <InputField
        label="Senha de Acesso"
        type="password"
        value={senhaAcesso}
        onChange={(e) => setSenhaAcesso(e.target.value)}
      />

      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? "Aguarde..." : "Acessar minha conta"}
      </button>
    </form>
  );
};

export default FormLogin;
