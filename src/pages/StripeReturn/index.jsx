import { useParams } from "react-router-dom";

export default function StripeReturn() {
  const { connectedAccountId } = useParams();

  console.log(connectedAccountId);

  return (
    <div className="container">
      <div className="banner">
        <h2>SocioClub</h2>
      </div>
      <div className="content">
        <h2>Dados enviados</h2>
        <p>Isso é tudo o que precisamos por enquanto.</p>
      </div>
      <div className="info-callout">
        <p>
          Este é um aplicativo de exemplo para o onboarding do Stripe Connect
          hospedado.{" "}
          <a
            href="https://docs.stripe.com/connect/onboarding/quickstart?connect-onboarding-surface=hosted"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver documentação
          </a>
        </p>
      </div>
    </div>
  );
}
