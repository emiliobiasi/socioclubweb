import EventCarousel from "../../components/Carousel/EventCarousel";
import EventCar from "../../assets/images/EventCar.png";
import Car from "../../assets/images/Car.svg";
import Teacher from "../../assets/images/Teacher.svg";
import Basketball from "../../assets/images/Basketball.svg";

const SectionEvents = () => {
  const events = [
    {
      backgroundImage: EventCar,
      categoria: { name: "Carros", icon: Car },
      dataEvento: "2024-09-12T14:00:00",
    },
    {
      backgroundImage:
        "https://sweetcherrypublishing.com/wp-content/uploads/2022/02/IAmAReader-Twitter-and-Facebook-post.jpg",
      categoria: { name: "Educação", icon: Teacher },
      dataEvento: "2024-09-20T09:00:00",
    },
    {
      backgroundImage:
        "https://c8.alamy.com/comp/2FX2YYM/football-championship-announcement-poster-with-golden-boot-and-cup-with-ball-in-speed-motion-and-typography-2FX2YYM.jpg",
      categoria: { name: "Esporte", icon: Basketball },
      dataEvento: "2024-09-25T18:00:00",
    },
  ];
  return <EventCarousel events={events} interval={5000} />;
};

export default SectionEvents;
