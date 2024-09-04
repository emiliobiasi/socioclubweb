import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CadastroClube from "../pages/CadastroClube/index.jsx";
import LandingPage from "../pages/LandingPage/index.jsx";
import Login from "../pages/Login/index.jsx";
import { AuthProvider } from "../contexts/AuthContext.jsx";
// import PrivateRoute from "../components/PrivateRoute/PrivateRoute.jsx";
import Home from "../pages/Home/index.jsx";
import GerenciamentoPlanos from "../pages/GerenciamentoPlanos/index.jsx";
import GerenciamentoProdutos from "../pages/GerenciamentoProdutos/index.jsx";
import GerenciamentoEventos from "../pages/GerenciamentoEventos/index.jsx";
import GerenciamentoNoticias from "../pages/GerenciamentoNoticias/index.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cadastrar-clube" element={<CadastroClube />} />
          <Route path="/login" element={<Login />} />
          {/* <Route
              path="/gerenciar-planos"
              element={
                <PrivateRoute>
                  <GerenciamentoPlanos />
                </PrivateRoute>
              }
            /> */}

          <Route path="/home" element={<Home />}>
            <Route path="gerenciar-produtos" element={<GerenciamentoProdutos />} />
            <Route path="gerenciar-eventos" element={<GerenciamentoEventos />} />
            <Route path="gerenciar-noticias" element={<GerenciamentoNoticias />} />
            <Route path="gerenciar-planos" element={<GerenciamentoPlanos />} />
          </Route>

        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
