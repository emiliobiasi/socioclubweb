import PropTypes from 'prop-types';

const Box = ({ columns, rows, margin, padding, children }) => {
  const boxStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`, // Ajuste para altura total
    width: '100vw',
    height: '93.5vh',
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
  children: PropTypes.node.isRequired,
};

Box.defaultProps = {
  margin: '0',
  padding: '0',
};

export default Box;
