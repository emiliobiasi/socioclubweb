import Navbar from "../../components/Navbar";
import SectionClubDestaque from "./SectionClubDestaque";
import SectionEvents from "./SectionEvent/index.jsx";
import SectionCategory from "./SectionCategory";
import SectionSocioClub from "./SectionSocioClub";
import SectionCategoryDestaque from "./SectionCategoryDestaque copy/index.jsx";
import SectionJoinClubCard from "./SectionJoinClub/index.jsx";
import styles from "./LandingPage.module.css";



const LandingPage = () => {
  return (
    <>
      <Navbar />
      <SectionSocioClub />
      <SectionCategory />
      <SectionClubDestaque />
      <SectionEvents />
      <SectionCategoryDestaque />
      <SectionJoinClubCard />
      <div className={styles.footer}>footer</div>
    </>
  );
};

export default LandingPage;
