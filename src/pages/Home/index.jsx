import Navbar from "../../components/Navbar";
import SectionSocioClub from "./sectionSocioClub";
import SectionCategory from "./sectionCategory";
import SectionClubDestaque from "./sectionClubDestaque";
import SectionEvents from "./sectionEvents";


const Home = () => {
  return (
    <>
      <Navbar />
      <SectionSocioClub />
      <SectionCategory />
      <SectionClubDestaque />
      <SectionEvents />
    </>
  );
};

export default Home;
