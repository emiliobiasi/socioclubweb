import { useEffect, useState } from "react";
import styles from "./EventCard.module.css";

const EventCard = ({ backgroundImage, categoria, dataEvento }) => {
  const [timeRemaining, setTimeRemaining] = useState({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(dataEvento) - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return timeLeft;
    };

    setTimeRemaining(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [dataEvento]);

  return (
    <div className={styles.eventCard}>
      <img src={backgroundImage} alt={categoria.name} />
      <div className={styles.category}>
        <img src={categoria.icon} alt={categoria.name} />
        <span>{categoria.name}</span>
      </div>
      <h2 className={styles.title}>Últimos Eventos Anunciados</h2>
      <button className={styles.viewEventButton}>Ver Evento</button>
      <div className={styles.timerBox}>
        <span>Tempo até a data do evento</span>
        <div className={styles.timer}>
          <div>
            <span className={styles.timerNumber}>{timeRemaining.hours}</span>
            <span className={styles.timerLabel}>Hours</span>
          </div>
          <span className={styles.colon}>:</span>
          <div>
            <span className={styles.timerNumber}>{timeRemaining.minutes}</span>
            <span className={styles.timerLabel}>Minutes</span>
          </div>
          <span className={styles.colon}>:</span>
          <div>
            <span className={styles.timerNumber}>{timeRemaining.seconds}</span>
            <span className={styles.timerLabel}>Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
