import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ColorCard.module.css";
import { ChromePicker } from "react-color";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Define o elemento raiz para acessibilidade

export const ColorCard = ({ title, color, onColorChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState(color);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleColorChange = (newColor) => {
    setCurrentColor(newColor.hex);
    onColorChange(newColor.hex); // Passa a nova cor para o componente pai
  };

  return (
    <div className={styles.colorCard}>
      <h4>{title}</h4>
      <div
        className={styles.containerCard}
        onClick={handleOpenModal} // Abre o modal ao clicar no card
      >
        <div
          style={{
            backgroundColor: currentColor,
            height: "60%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFF",
          }}
        >
          <span>AA 4.55</span>
        </div>
        <div className={styles.containerCode}>
          <strong>900</strong>
          <span>{currentColor}</span>
        </div>
      </div>

      {/* Modal com seletor de cores */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Selecione uma cor"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <h2>Escolha uma cor</h2>
        <div className={styles.container}>
          <ChromePicker color={currentColor} onChange={handleColorChange} />
        </div>
        <div className={styles.container}>
          <button onClick={handleCloseModal} className={styles.button}>
            Fechar
          </button>
        </div>
      </Modal>
    </div>
  );
};

ColorCard.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onColorChange: PropTypes.func, // Função para enviar a cor selecionada ao pai
};
