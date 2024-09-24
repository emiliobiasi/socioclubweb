import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("access_token");
    const clubInfo = localStorage.getItem("club_info");
    const expiresAt = localStorage.getItem("expires_at");

    let club = null;
    try {
      // Verifica se `club_info` é válido antes de tentar o parse
      club = clubInfo ? JSON.parse(clubInfo) : null;
    } catch (error) {
      console.error("Erro ao fazer parse de club_info do localStorage:", error);
      club = null; // Define como null se o JSON for inválido
    }

    return token ? { token, club, expiresAt } : null;
  });

  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}clubLogin`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { access_token, expires_at, club } = response.data;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("club_info", JSON.stringify(club));
        localStorage.setItem("expires_at", expires_at);

        setAuth({ token: access_token, club, expiresAt: expires_at });
        navigate("/inicio");
      } else {
        alert("Credenciais inválidas");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login. Por favor, tente novamente.");
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("club_info");
    localStorage.removeItem("expires_at");
    setAuth(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext };
