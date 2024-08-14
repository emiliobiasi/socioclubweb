import Navbar from "../../components/Navbar";
import SectionSocioClub from "./sectionSocioClub";
import SectionCategory from "./sectionCategory";
import SectionClubDestaque from "./sectionClubDestaque";

const Home = () => {
  return (
    <>
      <Navbar />
      <SectionSocioClub />
      <SectionCategory />
      <SectionClubDestaque />
    </>
  );
};

export default Home;
