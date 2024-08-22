import CadastroClube from "../pages/CadastroClube";
import Home from "../pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/cadastrar-clube" element={<CadastroClube/>}></Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
