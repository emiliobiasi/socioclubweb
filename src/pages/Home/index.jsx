import Box from "../../components/Boxes/Box";
import BoxRow from "../../components/Boxes/BoxRow";
import Navbar from "../../components/Navbar";
import CategoryCard from "../../components/Cards/CategoryCard";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className={styles.home}>
        <Box columns={2} rows={1} padding="100px" height="100vh">
          {/* Coluna da esquerda */}
          <div className={styles["left-column-section1"]}>
            <h1>SOCIOCLUB</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Consequatur sequi deserunt quia perferendis cum ipsam, quos itaque
              quam ex, ipsa molestias facere excepturi accusamus aliquid totam
              ipsum ea harum atque. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Incidunt deserunt eligendi ab neque tempora ad
              illo ipsam cum tenetur sint dolores reiciendis earum voluptatum
              nobis, ut, sit, totam illum fugiat! Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Repudiandae perferendis unde tenetur
              modi repellendus eum a consectetur nemo ea commodi ullam,
              explicabo eos qui? Omnis assumenda laboriosam natus quisquam
              dolor.
            </p>
            <button>🚀 Get Started</button>
            <div className={styles["stats-row"]}>
              <div>
                <h2>240k+</h2>
                <p>Total Usuarios</p>
              </div>
              <div>
                <h2>100k+</h2>
                <p>Total Clubes</p>
              </div>
            </div>
          </div>

          {/* Coluna da direita */}
          <div className={styles["right-column"]}>
            <img
              src="https://cdn.pixabay.com/photo/2016/11/29/03/53/athletes-1867185_1280.jpg"
              alt="Soccer Team"
            />
          </div>
        </Box>
      </div>

      <div className={styles.home}>
        <Box columns={4} rows={2} padding="100px">
          <BoxRow>
            <div style={{ border: "1px solid black", padding: "10px" }}>
              <CategoryCard
                backgroundImage={
                  "https://www.w3schools.com/howto/img_avatar.png"
                }
                iconImage={"https://www.w3schools.com/howto/img_avatar2.png"}
                title={"Artes"}
              />
            </div>
            <div style={{ border: "1px solid black", padding: "10px" }}>
              <CategoryCard
                backgroundImage={
                  "https://www.w3schools.com/howto/img_avatar.png"
                }
                iconImage={"https://www.w3schools.com/howto/img_avatar2.png"}
                title={"Futebol"}
              />
            </div>
            <div style={{ border: "1px solid black", padding: "10px" }}>
              <CategoryCard
                backgroundImage={
                  "https://www.w3schools.com/howto/img_avatar.png"
                }
                iconImage={"https://www.w3schools.com/howto/img_avatar2.png"}
                title={"Música"}
              />
            </div>
            <div style={{ border: "1px solid black", padding: "10px" }}>
            <CategoryCard
                backgroundImage={
                  "https://www.w3schools.com/howto/img_avatar.png"
                }
                iconImage={"https://www.w3schools.com/howto/img_avatar2.png"}
                title={"Fotografia"}
              />
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
