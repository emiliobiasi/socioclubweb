import { useEffect } from 'react';
import styles from './Alert.module.css';

const Alert = ({ type = 'success', message = '', onClose }) => {
    useEffect(() => {
        // Configura o temporizador para ocultar o alerta automaticamente após 3 segundos
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        // Limpa o temporizador quando o componente é desmontado
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`${styles.alert} ${styles[type]}`}>
            <span className={styles.icon}>{type === 'success' ? '✔️' : '❌'}</span>
            <strong>{type.toUpperCase()}!</strong>
            <span>{message}</span>
            <span className={styles.closeBtn} onClick={onClose}>✖️</span>
        </div>
    );
};

export default Alert;
