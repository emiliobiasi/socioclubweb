import { useState, useEffect } from 'react';
import styles from './EventCarousel.module.css';
import EventCard from '../../Cards/EventCard';

const EventCarousel = ({ events, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const changeEvent = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    };

    const timer = setInterval(changeEvent, interval);

    return () => clearInterval(timer);
  }, [events.length, interval]);

  console.log(events)

  return (
    <div id="section4" className={styles.carousel}>
      <EventCard
        backgroundImage={events[currentIndex].backgroundImage}
        categoria={events[currentIndex].categoria}
        dataEvento={events[currentIndex].dataEvento}
      />
    </div>
  );
};

export default EventCarousel;
