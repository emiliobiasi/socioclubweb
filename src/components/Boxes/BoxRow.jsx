import PropTypes from 'prop-types';

const BoxRow = ({ children }) => {
  const rowStyle = {
    display: 'contents',
  };

  return <div style={rowStyle}>{children}</div>;
};

BoxRow.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BoxRow;
