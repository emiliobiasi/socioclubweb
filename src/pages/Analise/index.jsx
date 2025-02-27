import { useState } from "react";
import { MdOpenWith } from "react-icons/md";
import styles from "./Analise.module.css";

const Analise = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeFrameSrc, setActiveFrameSrc] = useState("");

  const frameLinks = [
    "http://localhost:3000/d-solo/be31gl6cb7u9sb/socioclub?from=1731650294399&to=1731671894399&timezone=browser&orgId=1&panelId=4&__feature.dashboardSceneSolo",
    "http://localhost:3000/d-solo/be31gl6cb7u9sb/socioclub?from=1731650294399&to=1731671894399&timezone=browser&orgId=1&panelId=3&__feature.dashboardSceneSolo",
    "http://localhost:3000/d-solo/be31gl6cb7u9sb/socioclub?from=1731650294399&to=1731671894399&timezone=browser&orgId=1&panelId=2&__feature.dashboardSceneSolo",
    "http://localhost:3000/d-solo/be31gl6cb7u9sb/socioclub?from=1731650294399&to=1731671894399&timezone=browser&orgId=1&panelId=1&__feature.dashboardSceneSolo",
  ];

  const openModal = (src) => {
    setActiveFrameSrc(src);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveFrameSrc("");
  };

  return (
    <div className={styles.financeiroContainer}>
      <div>
        <h1 className={styles.title}>Análise</h1>
      </div>
      <div className={styles.grid_container}>
        {frameLinks.map((link, index) => (
          <div className={styles.grid_item} key={index}>
            <iframe
              src={link}
              width="100%"
              height="100%"
              frameBorder="0"
              title={`Frame ${index + 1}`}
            ></iframe>
            <button
              onClick={() => openModal(link)}
              className={styles.openButton}
            >
              <MdOpenWith size={24} color="#fff" />
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={activeFrameSrc}
              width="100%"
              height="100%"
              frameBorder="0"
            ></iframe>
            <button onClick={closeModal} className={styles.closeButton}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analise;
