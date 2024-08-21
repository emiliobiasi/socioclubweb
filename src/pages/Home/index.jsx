import Navbar from "../../components/Navbar";
import SectionSocioClub from "./sectionSocioClub";
import SectionCategory from "./sectionCategory";
import SectionClubDestaque from "./sectionClubDestaque";
import CarouselComponent from "../../components/Carousel";

const Home = () => {
  const carouselItems = [
    {
      image: 'https://github.com/Elias-FS.png',
      title: 'Los Angeles',
      subtitle: 'We had such a great time in LA!',
    },
    {
      image: 'https://github.com/Elias-FS.png',
      title: 'Chicago',
      subtitle: 'Thank you, Chicago!',
    },
    {
      image: 'https://github.com/Elias-FS.png',
      title: 'New York',
      subtitle: 'We love the Big Apple!',
    },
  ];

  return (
    <>
      <Navbar />
      <SectionSocioClub />
      <SectionCategory />
      <SectionClubDestaque />
      {/* <CarouselComponent items={carouselItems}/> */}
    </>
  );
};

export default Home;
