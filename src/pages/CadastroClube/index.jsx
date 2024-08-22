import FormCadastro from '../../components/Forms/FormCadastro';
import styles from './CadastroClube.module.css';
import LogoTexto from '../../assets/images/LogoTexto.svg'
import BackgroundFootball from '../../assets/images/BackgroundFootball.svg'

const CadastroClube = () => {
  return (
    <div className={styles.cadastroContainer}>
      <div className={styles.leftSection}>
        <img src={LogoTexto} alt="Logo SocioClub" className={styles.logo} />
        <div className={styles.infoSection}>
          <img src={BackgroundFootball} alt="Imagem de fundo" className={styles.infoImage} />
          <h1>Acompanhe as últimas notícias do seu clube favorito.</h1>
          <p>
            Se tornando um sócio, além das últimas notícias do seu clube, 
            também tenha a possibilidade de comprar produtos com exclusividade.
          </p>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.navigationLinks}>
          <a href="/"><i className="fas fa-chevron-left"></i> Retornar para página inicial</a>
          <a href="/login">Já é um sócio? <strong>ENTRE AGORA</strong></a>
        </div>
        <FormCadastro />
      </div>
    </div>
  );
};

export default CadastroClube;
