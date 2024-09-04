import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar";
// import SideBar2 from "../../components/SideBar2";

const Home = () => {
  return (
    <>
      <SideBar>
        <Outlet />
      </SideBar>
    </>
  );
};

export default Home;
