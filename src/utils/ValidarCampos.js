
import validacoes from '../utils/validacoes.json'
export const validarCampos = (dados) => {
  const errosTemp = {};

  for (const campo in dados) {
    if (validacoes[campo]) {
      const { regex, mensagemErro } = validacoes[campo];
      const regexObj = new RegExp(regex);
      if (!regexObj.test(dados[campo])) {
        errosTemp[campo] = mensagemErro;
      }
    }
  }
  return errosTemp;  
};

export default validarCampos
