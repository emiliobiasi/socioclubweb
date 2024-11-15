import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InputField from "../../Inputs/InputField";
import styles from "./CompleteCadastro.module.css";
import ClubService from "../../../services/club.service";
import ImageService from "../../../services/image.service";
import { useAuth } from "../../../contexts/auth/useAuth.jsx";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const CompleteCadastro = ({ clubInfo, onComplete }) => {
  const [description, setDescription] = useState(clubInfo?.description || "");
  const [logoFile, setLogoFile] = useState("");
  const [backgroundFile, setBackgroundFile] = useState("");

  const { auth, setAuth } = useAuth();
  const [clubId, setClubId] = useState("");

  useEffect(() => {
    if (auth?.club?.id) {
      setClubId(auth.club.id);
    }
    console.log("clubInfo: ", auth?.club);
  }, [auth]);

  const handleUpload = async (imgUrl, imageFile) => {
    if (!imageFile) return;

    await fetch(imgUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: imageFile,
    });
  };

  const handleImgUrl = async (imageName, imageFile) => {
    const response = await ImageService.generateImageUrl(imageName);
    await handleUpload(response.data.url, imageFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const timestamp = Date.now();
      let logoUrl = auth.club.logo || ""; // Use existing logo if not updated
      let backgroundUrl = auth.club.background || ""; // Use existing background if not updated

      if (logoFile) {
        const logoName = `${timestamp}_logo_${logoFile.name}`;
        await handleImgUrl(logoName, logoFile);
        logoUrl = `https://storage.googleapis.com/socioclub/${logoName}`;
      }

      if (backgroundFile) {
        const backgroundName = `${timestamp}_background_${backgroundFile.name}`;
        await handleImgUrl(backgroundName, backgroundFile);
        backgroundUrl = `https://storage.googleapis.com/socioclub/${backgroundName}`;
      }

      // Call the service to update club info
      const response = await ClubService.setUpClub(
        clubId,
        description,
        logoUrl,
        backgroundUrl
      );

      if (response.status === 200) {
        // Since response doesn't return updated club info, update it manually
        const updatedClub = {
          ...auth.club,
          description: description,
          logo: logoUrl,
          background: backgroundUrl,
        };

        // Update localStorage
        localStorage.setItem("club_info", JSON.stringify(updatedClub));

        // Update the auth state
        setAuth((prevAuth) => ({
          ...prevAuth,
          club: updatedClub,
        }));

        alert("Cadastro atualizado com sucesso!");
        onComplete(); // Notify the parent component that the registration is complete
      } else {
        alert("Erro ao atualizar cadastro. Tente novamente.");
      }
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
          label="Logo"
          type="file"
          onChange={(file1) => {
            console.log("Logo selecionado:", file1);
            setLogoFile(file1);
          }}
          icon={faImage}
        />
        <InputField
          label="Imagem de Fundo"
          type="file"
          onChange={(file2) => {
            console.log("Imagem de Fundo selecionada:", file2);
            setBackgroundFile(file2);
          }}
          icon={faImage}
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
    id: PropTypes.number,
  }),
  onComplete: PropTypes.func.isRequired,
};

export default CompleteCadastro;
