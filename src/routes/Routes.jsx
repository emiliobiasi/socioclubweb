import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CadastroClube from "../pages/CadastroClube/index.jsx";
import LandingPage from "../pages/LandingPage/index.jsx";
import Login from "../pages/Login/index.jsx";
import { AuthProvider } from "../contexts/auth/AuthContext.jsx";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute.jsx";
import Home from "../pages/Home/index.jsx";
import GerenciamentoPlanos from "../pages/GerenciamentoPlanos/index.jsx";
import GerenciamentoProdutos from "../pages/GerenciamentoProdutos/index.jsx";
import GerenciamentoEventos from "../pages/GerenciamentoEventos/index.jsx";
import GerenciamentoNoticias from "../pages/GerenciamentoNoticias/index.jsx";
import CriarPlano from "../pages/CriarPlano/index.jsx";
import CriarEvento from "../pages/CriarEvento/index.jsx";
import CriarNoticia from "../pages/CriarNoticia/index.jsx";
import CriarProduto from "../pages/CriarProduto/index.jsx";
import PersonalizarClube from "../pages/PersonalizarClube/index.jsx";
import Inicio from "../pages/Inicio/index.jsx";
import Financeiro from "../pages/Financeiro/index.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/socioclub-lp" element={<LandingPage />} />
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

          <Route path="/" element={<Home />}>
            <Route
              path="inicio"
              element={
                <PrivateRoute>
                  <Inicio />
                </PrivateRoute>
              }
            />
            <Route
              path="gerenciar-produtos"
              element={
                <PrivateRoute>
                  <GerenciamentoProdutos />
                </PrivateRoute>
              }
            />
            <Route
              path="gerenciar-eventos"
              element={<GerenciamentoEventos />}
            />
            <Route
              path="gerenciar-noticias"
              element={<GerenciamentoNoticias />}
            />
            <Route path="gerenciar-planos" element={<GerenciamentoPlanos />} />

            <Route path="criar-plano" element={<CriarPlano />} />

            <Route path="criar-produto" element={<CriarProduto />} />

            <Route path="criar-evento" element={<CriarEvento />} />

            <Route path="criar-noticia" element={<CriarNoticia />} />

            <Route
              path="personalizar-clube"
              element={
                <PrivateRoute>
                  <PersonalizarClube />
                </PrivateRoute>
              }
            />
            <Route
              path="financeiro"
              element={
                <PrivateRoute>
                  <Financeiro />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
