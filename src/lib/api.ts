import axios from 'axios';

export const fetchCep = async (cep: string) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return null;
  }
};
