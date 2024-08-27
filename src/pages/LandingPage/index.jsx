import Navbar from "../../components/Navbar";
import SectionClubDestaque from "./SectionClubDestaque";
import SectionEvents from "./sectionEvents";
import SectionCategory from "./SectionCategory";
import SectionSocioClub from "./SectionSocioClub";


const LandingPage = () => {
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

export default LandingPage;
