import PropTypes from "prop-types";
import "./Button.css";

const STYLES = ["btn--primary", "btn--outline"];
const SIZES = ["btn--small", "btn--medium", "btn--large"];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  icon, // nova prop para o ícone
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  buttonStyle: PropTypes.oneOf(STYLES),
  buttonSize: PropTypes.oneOf(SIZES),
  icon: PropTypes.node, // nova propType para o ícone
};

Button.defaultProps = {
  type: "button",
  buttonStyle: STYLES[0],
  buttonSize: SIZES[0],
};

export default Button;
