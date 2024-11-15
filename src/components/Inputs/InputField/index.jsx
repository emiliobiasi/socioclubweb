import PropTypes from "prop-types";
import styles from "./InputField.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faChevronDown, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";

const InputField = ({ label, type, value, onChange, labelColor, icon, options }) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState(null);
  const inputRef = useRef(null); // Cria um ref para o input de arquivo

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      onChange(file);
      setFileName(file.name);
    } else {
      alert("Por favor, selecione um arquivo de imagem.");
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      onChange(file);
      setFileName(file.name);
    } else {
      alert("Por favor, selecione um arquivo de imagem.");
      e.target.value = null;
    }
  };

  return (
    <div className={styles.inputField}>
      <label className={styles.label} style={{ color: labelColor }}>
        {label}
      </label>
      {type === "file" ? (
        <div
          className={`${styles.fileDropZone} ${dragActive ? styles.active : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current.click()} // Usa o ref para acionar o clique
        >
          <FontAwesomeIcon icon={icon} className={styles.iconFile} />
          <p>Arraste ou selecione uma imagem</p>
          <input
            ref={inputRef} // Associa o ref ao input
            type="file"
            onChange={handleFileSelect}
            className={styles.hiddenInput}
            accept="image/*"
          />
        </div>
      ) : type === "dropdown" ? (
        <div className={styles.inputWrapper}>
          <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
          <select value={value} onChange={onChange} className={styles.inputElement}>
            {options.map(({ name, value }) => (
              <option key={value} value={value}>
                {name}
              </option>
            ))}
          </select>
        </div>
      ) : type === "date" ? (
        <div className={styles.inputWrapper}>
          <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} />
          <input
            type="date"
            value={value}
            onChange={onChange}
            className={`${styles.inputElement} ${styles.dateInput}`}
          />
        </div>
      ) : type === "number" ? (
        <div className={styles.inputWrapper}>
          <FontAwesomeIcon icon={icon} className={styles.icon} />
          <input type="number" value={value} onChange={onChange} className={styles.inputElement} />
        </div>
      ) : (
        <div className={styles.inputWrapper}>
          {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
          <input type={type} value={value} onChange={onChange} className={styles.inputElement} />
        </div>
      )}

      {fileName && (
        <div className={styles.fileInfo}>
          <FontAwesomeIcon icon={faImage} className={styles.fileIcon} />
          <span className={styles.fileName}>{fileName}</span>
        </div>
      )}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
  labelColor: PropTypes.string,
  icon: PropTypes.object,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ),
};

InputField.defaultProps = {
  type: "text",
  labelColor: "#333",
  options: [],
};

export default InputField;
