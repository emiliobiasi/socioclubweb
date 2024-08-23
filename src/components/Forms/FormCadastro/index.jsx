import { useState } from "react";
import InputField from "../../Inputs/InputField";
import styles from "./FormCadastro.module.css";

const FormCadastro = () => {
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
    }
    console.log('Dados do formulário:', formData);
  };

  return (
    <form className={styles.formCadastro} onSubmit={handleSubmit}>
      <h2>SEJA AGORA UM CLUBE CADASTRADO</h2>
      <p>REGISTRE-SE E COMECE A ADMINISTRAR SEUS SÓCIOS TOCEDORES</p>

      <InputField
        label="CNPJ"
        type="text"
        value={cnpj}
        onChange={(e) => setCnpj(e.target.value)}
      />

      <InputField
        label="Nome do Clube"
        type="text"
        value={nomeClube}
        onChange={(e) => setNomeClube(e.target.value)}
      />

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

      <InputField
        label="CEP da Sede do Clube"
        type="text"
        value={cepClube}
        onChange={(e) => setCepClube(e.target.value)}
      />

      <InputField
        label="Comprovante de endereço comercial do clube"
        type="file"
        onChange={(e) => setEnderecoComercial(e.target.files[0])}
      />

      <button type="submit" className={styles.submitButton}>
        Tornar-se um membro
      </button>
    </form>
  );
};

export default FormCadastro;
