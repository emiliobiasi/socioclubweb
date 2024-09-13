import PropTypes from "prop-types";

export const ColorCard = ({ title, color }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h4>{title}</h4>
      <div
        style={{
          width: "150px",
          height: "100px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            backgroundColor: color,
            height: "60%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFF",
          }}
        >
          <span>AA 4.55</span>{" "}
        </div>
        <div
          style={{
            backgroundColor: "#FFF",
            height: "40%",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "12px",
          }}
        >
          <strong>900</strong>
          <span>{color}</span>
        </div>
      </div>
    </div>
  );
};

ColorCard.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
