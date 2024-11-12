import { useState } from "react";
import PropTypes from "prop-types";
import InputField from "../../Inputs/InputField";
import styles from "./CompleteCadastro.module.css";
import ClubService from "../../../services/club.service";

const CompleteCadastro = ({ clubInfo, onComplete }) => {
  const [description, setDescription] = useState(clubInfo?.description || "");
  const [logo, setLogo] = useState(clubInfo?.logo || "");
  const [background, setBackground] = useState(clubInfo?.background || "");
  const [clubCategory, setClubCategory] = useState(
    clubInfo?.club_category || ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedInfo = {
      description,
      logo,
      background,
      club_category: clubCategory,
    };

    try {
      // Chama o serviço para atualizar as informações do clube
      await ClubService.updateClubInfo(updatedInfo);
      alert("Cadastro atualizado com sucesso!");
      onComplete(); // Notifica o componente pai que o cadastro foi completado
    } catch (error) {
      console.error("Erro ao atualizar cadastro:", error);
      alert("Erro ao atualizar cadastro. Tente novamente.");
    }
  };

  return (
    <div className={styles.completeCadastro}>
      <h2>Complete seu cadastro</h2>
      <p>
        Para acessar todas as funcionalidades, finalize o cadastro do seu clube.
      </p>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Descrição"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <InputField
          label="Logo (URL)"
          type="text"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
        />
        <InputField
          label="Imagem de fundo (URL)"
          type="text"
          value={background}
          onChange={(e) => setBackground(e.target.value)}
        />
        <InputField
          label="Categoria do Clube"
          type="number"
          value={clubCategory}
          onChange={(e) => setClubCategory(e.target.value)}
        />
        <button type="submit" className={styles.completeButton}>
          Enviar Informações
        </button>
      </form>
    </div>
  );
};
CompleteCadastro.propTypes = {
  clubInfo: PropTypes.shape({
    description: PropTypes.string,
    logo: PropTypes.string,
    background: PropTypes.string,
    club_category: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onComplete: PropTypes.func.isRequired,
};

export default CompleteCadastro;
