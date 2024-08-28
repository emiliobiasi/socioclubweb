import Navbar from "../../components/Navbar";
import SectionClubDestaque from "./SectionClubDestaque";
import SectionEvents from "./SectionEvent/index.jsx";
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
