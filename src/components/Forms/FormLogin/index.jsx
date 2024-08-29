import { useState } from "react";
import InputField from "../../Inputs/InputField/index.jsx";
import styles from "./FormLogin.module.css";
import ClubService from "../../../services/club.service.js";

const FormLogin = () => {
  const [cnpj, setCnpj] = useState("");
  const [nomeClube, setNomeClube] = useState("");
  const [emailClube, setEmailClube] = useState("");
  const [senhaAcesso, setSenhaAcesso] = useState("");
  const [cepClube, setCepClube] = useState("");
  const [enderecoComercial, setEnderecoComercial] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      cnpj,
      nomeClube,
      emailClube,
      senhaAcesso,
      cepClube,
      enderecoComercial,
    };

    ClubService.createClub(nomeClube, emailClube, senhaAcesso, cnpj, cepClube);
    console.log("Dados do formulário:", formData);
  };

  return (
    <form className={styles.formCadastro} onSubmit={handleSubmit}>
      <h2>ENTRE E GERENCIE SUA PLATAFORMA </h2>
      <p>CONTINUE ADMNISTRANDO E PERSONALIZANDO SEU SOCIO CLUB </p>

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

      <button type="submit" className={styles.submitButton}>
        Acessar minha conta
      </button>
    </form>
  );
};

export default FormLogin;
