import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("access_token");
    const club = JSON.parse(localStorage.getItem("club_info")); // Carrega o clube do localStorage se existir
    const expiresAt = localStorage.getItem("expires_at"); // Carrega a data de expiração se existir
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
        const { access_token, expires_at, club } = response.data; // Obtem os dados da resposta

        // Armazena os dados no localStorage
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("club_info", JSON.stringify(club));
        localStorage.setItem("expires_at", expires_at);

        // Atualiza o estado de autenticação com o token, clube e data de expiração
        setAuth({ token: access_token, club, expiresAt: expires_at });
        navigate("/home/gerenciar-produtos");
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
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
