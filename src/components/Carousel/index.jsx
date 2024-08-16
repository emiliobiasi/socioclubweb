import PropTypes from "prop-types";
import styles from "./Carousel.module.css"; // Import do CSS Module
import Box from "../Boxes/Box";

const CarouselComponent = ({ items }) => {
  return (
    <>
      <Box>
        <div className={styles.carouselContainer}>
          {/* Carousel */}
          <div id="demo" className="carousel slide" data-bs-ride="carousel">
            {/* Indicators/dots */}
            <div className="carousel-indicators">
              {items.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#demo"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                />
              ))}
            </div>

            {/* The slideshow/carousel */}
            <div className="carousel-inner">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`d-block w-100 ${styles.carouselImage}`}
                  />
                  <div className={`carousel-caption ${styles.customCaption}`}>
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Left and right controls/icons */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#demo"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#demo"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>
      </Box>
    </>
  );
};

CarouselComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CarouselComponent;
