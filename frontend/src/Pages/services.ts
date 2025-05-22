import { api, routeApiV1 } from "../services/services";
import { Catequista, Crismando, DataResultGenericService, Encontros, LoginPayload, PresencaInput } from "./types";
import { HttpStatusCode as http } from "../services/enums";

export const adicionarCrismando = async (crismando: Crismando): Promise<Crismando | null> => {
  const logFunctionName = 'adicionarCrismandos';
  try {
    const response = await api.post(`${routeApiV1}/crismandos`, crismando);
    if (response.status === http.CREATED || response.status === http.OK) {
      return response.data;
    } else {
      console.log(`Erro: Status de resposta ${response.status} na função ${logFunctionName}`);
      return null;
    }
  } catch (e) {
    console.log(`Ocorreu um ERRO na função ${logFunctionName}`, e);
    return e;
  }
};

export const listarChamada = async (idTurma): Promise<DataResultGenericService<Crismando[]>> => {
  const logFunctionName = 'listarChamada';
  try {
    const response = await api.get(`${routeApiV1}/crismandos/${idTurma}`);
    if (response.status === http.OK) {
      return response.data;
    } else {
      console.log(`Erro: Status de resposta ${response.status} na função ${logFunctionName}`);
      return response;
    }
  } catch (e) {
    console.log(`Ocorreu um ERRO na função ${logFunctionName}`, e);
    return e;
  }
};

export const ListarCatequistas = async (idTurma): Promise<DataResultGenericService<Catequista[]>> => {
  const logFunctionName = 'listarCatequistas';
  try {
    const response = await api.get(`${routeApiV1}/catequistas/${idTurma}`);
    if (response.status === http.OK) {
      return response.data;
    } else {
      console.log(`Erro: Status de resposta ${response.status} na função ${logFunctionName}`);
      return response;
    }
  } catch (e) {
    console.log(`Ocorreu um ERRO na função ${logFunctionName}`, e);
    return e;
  }
};

export const ListarEncontros = async (): Promise<DataResultGenericService<Encontros[]>> => {
  const logFunctionName = 'ListarEncontros';
  try {
    const response = await api.get(`${routeApiV1}/encontros`);
    if (response.status === http.OK) {
      return response.data;
    } else {
      console.log(`Erro: Status de resposta ${response.status} na função ${logFunctionName}`);
      return response;
    }
  } catch (e) {
    console.log(`Ocorreu um ERRO na função ${logFunctionName}`, e);
    return e;
  }
};

export const registrarChamada = async (
  idTurma: number,
  presencas: PresencaInput[]
): Promise<boolean> => {
  const logFunctionName = 'registrarChamada';
  try {
    const response = await api.post(`${routeApiV1}/chamada/registrar`, {
      idTurma,
      presencas
    });

    if (response.status === http.CREATED || response.status === http.OK) {
      return true;
    } else {
      console.log(`Erro: Status de resposta ${response.status} na função ${logFunctionName}`);
      return false;
    }
  } catch (e) {
    console.log(`Ocorreu um ERRO na função ${logFunctionName}`, e);
    return false;
  }
};

export async function login(loginPayload: LoginPayload) {
  try {
    const response = await api.post(`${routeApiV1}/login`, loginPayload);
    const { token, usuario } = response.data;

    if (token) {
      localStorage.setItem('jwt_token', token);
    }

    return { sucesso: true, usuario };
  } catch (err) {
    console.error('Erro no login:', err.response?.data || err.message);
    return { sucesso: false, erro: err.response?.data?.mensagem || 'Erro ao fazer login' };
  }
}

export async function register(loginPayload: LoginPayload) {
  try {
    const response = await api.post(`${routeApiV1}/register`, loginPayload);

    return { sucesso: true, dados: response.data };
  } catch (error) {
    return { sucesso: false, erro: error.response?.data?.erro || 'Erro ao registrar' };
  }
}
