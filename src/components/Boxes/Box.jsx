import PropTypes from 'prop-types';

const Box = ({ columns, rows, margin, padding, width, height, children }) => {
  const boxStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`, // Ajuste para altura total
    width: width,
    height: height,
    margin: margin,
    padding: padding,
  };

  return <div style={boxStyle}>{children}</div>;
};

Box.propTypes = {
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  margin: PropTypes.string,
  padding: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Box.defaultProps = {
  margin: '0',
  padding: '0',
  width: '100vw',   // Valor padrão para largura
  height: '93.5vh', // Valor padrão para altura
};

export default Box;
