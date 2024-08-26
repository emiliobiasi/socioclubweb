import CadastroClube from "../pages/CadastroClube";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/cadastrar-clube" element={<CadastroClube/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
