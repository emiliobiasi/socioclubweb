import PropTypes from 'prop-types';

const Box = ({ columns, rows, margin, padding, paddingTop, paddingRight, paddingBottom, paddingLeft, width, height, children }) => {
  const boxStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`, // Ajuste para altura total
    width: width,
    height: height,
    margin: margin,
    padding: padding,
    paddingTop: paddingTop,
    paddingRight: paddingRight,
    paddingBottom: paddingBottom,
    paddingLeft: paddingLeft,
  };

  return <div style={boxStyle}>{children}</div>;
};

Box.propTypes = {
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  margin: PropTypes.string,
  padding: PropTypes.string,
  paddingTop: PropTypes.string,
  paddingRight: PropTypes.string,
  paddingBottom: PropTypes.string,
  paddingLeft: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Box.defaultProps = {
  margin: '0',
  padding: '0',
  paddingTop: '0',
  paddingRight: '0',
  paddingBottom: '0',
  paddingLeft: '0',
  width: '100vw',   // Valor padrão para largura
  height: '93.5vh', // Valor padrão para altura
};

export default Box;
