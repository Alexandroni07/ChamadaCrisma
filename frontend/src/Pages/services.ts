import { api, routeApiV1 } from "../services/services";
import { Catequista, Crismando, DataResultGenericService, Encontros } from "./types";
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

export const listarChamada = async (): Promise<DataResultGenericService<Crismando[]>> => {
  const logFunctionName = 'listarChamada';
  try {
    const response = await api.get(`${routeApiV1}/crismandos`);
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

export const ListarCatequistas = async (): Promise<DataResultGenericService<Catequista[]>> => {
  const logFunctionName = 'listarCatequistas';
  try {
    const response = await api.get(`${routeApiV1}/catequistas`);
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
