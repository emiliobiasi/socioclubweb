// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();

  return auth ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
