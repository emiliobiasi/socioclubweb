import { useAuth } from "../../contexts/auth/useAuth";

const Inicio = () => {
  const { logout, auth } = useAuth();

  const clubInfo = auth?.club;
  const token = auth?.token;
  const expiresAt = auth?.expiresAt;

  return (
    <>
      <h1>Tela inicial</h1>

      <h2>Informações do Clube:</h2>
      {clubInfo ? (
        <div>
          <p>ID: {clubInfo.id}</p>
          <p>Nome: {clubInfo.name}</p>
          <p>Email: {clubInfo.email}</p>
          <p>CNPJ: {clubInfo.cnpj}</p>
          <p>Descrição: {clubInfo.description}</p>
          <p>Endereço: {clubInfo.address}</p>
          <p>
            Logo: <img src={clubInfo.logo} alt="Logo do clube" width={100} />
          </p>
          <p>
            Background:{" "}
            <img
              src={clubInfo.background}
              alt="Background do clube"
              width={200}
            />
          </p>
        </div>
      ) : (
        <p>Informações do clube não disponíveis.</p>
      )}

      <p>Token: {token}</p>
      <p>Expira em: {expiresAt}</p>

      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Inicio;
