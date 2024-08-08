import Box from "../../components/Boxes/Box";
import BoxRow from "../../components/Boxes/BoxRow";
import Navbar from "../../components/Navbar";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className={styles.home}>
        <Box columns={3} rows={2} padding="100px">
          <BoxRow>
            <h1>Home</h1>
            <div style={{ border: "1px solid black", padding: "10px" }}>
              Item 2
            </div>
            <div style={{ border: "1px solid black", padding: "10px" }}>
              Item 3
            </div>
          </BoxRow>
          <BoxRow>
            <div style={{ border: "1px solid black", padding: "10px" }}>
              Item 4
            </div>
            <div style={{ border: "1px solid black", padding: "10px" }}>
              Item 5
            </div>
            <div style={{ border: "1px solid black", padding: "10px" }}>
              Item 6
            </div>
          </BoxRow>
        </Box>
      </div>
    </>
  );
};

export default Home;
