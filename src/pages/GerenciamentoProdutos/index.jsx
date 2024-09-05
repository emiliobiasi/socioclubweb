import { useAuth } from "../../contexts/AuthContext";

const GerenciamentoProdutos = () => {
  const { logout, auth } = useAuth(); 
  const clubInfo = auth?.club.id; 
  const token = auth?.token;
  const expiresAt = auth?.expiresAt; 


  return (
    <>
      <h1>Gerenciamento de Produtos</h1>
      <p>Clube: {JSON.stringify(clubInfo)}</p>
      <p>Token: {token}</p> 
      <p>Expira em: {expiresAt}</p>

      <button onClick={logout}>Logout</button>
    </>
  );
};

export default GerenciamentoProdutos;
