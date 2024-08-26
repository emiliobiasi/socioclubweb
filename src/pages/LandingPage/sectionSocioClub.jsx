import Box from "../../components/Boxes/Box";
import styles from "./LandingPage.module.css";

const SectionSocioClub = () => {
  return (
    <div className={styles.home}>
      <Box
        columns={2}
        rows={1}
        paddingLeft={"300px"}
        paddingRight={"300px"}
        height="100vh"
      >
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
            modi repellendus eum a consectetur nemo ea commodi ullam, explicabo
            eos qui? Omnis assumenda laboriosam natus quisquam dolor.
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
  );
};

export default SectionSocioClub;
