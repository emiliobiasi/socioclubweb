import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./EventCarousel.module.css";
import EventSlideCard from "../../Cards/EventSlideCard";

const EventCarousel = ({ events, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const changeEvent = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    };

    const timer = setInterval(changeEvent, interval);

    return () => clearInterval(timer);
  }, [events.length, interval]);

  console.log(events);

  return (
    <div id="section4" className={styles.carousel}>
      <EventSlideCard
        backgroundImage={events[currentIndex].backgroundImage}
        categoria={events[currentIndex].categoria}
        dataEvento={events[currentIndex].dataEvento}
      />
    </div>
  );
};

EventCarousel.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      backgroundImage: PropTypes.string.isRequired,
      categoria: PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      }).isRequired,
      dataEvento: PropTypes.string.isRequired, // Ajuste conforme o formato usado para data
    })
  ).isRequired, // Valida que o array de eventos é obrigatório
  interval: PropTypes.number, // O intervalo entre as trocas de slides, em milissegundos
};

export default EventCarousel;
