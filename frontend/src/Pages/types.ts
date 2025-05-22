export type DataResultGenericService<T> = {
    data: T
    total?: number;
    status?: number;
};

export type Crismando = {
    nome: string;
    id_turma?: number;
    telefone: string;
    email: string;
    responsavel: string;
    id?: number;
}

export type Catequista ={
    nome: string;
    id_turma?: number;
    id?: number;
}

export type Encontros = {
    id?: number;
    data?: string;
    in_tipo?: TipoPresenca;
    id_turma?: number;
}

export type TurmaData = {
    turma: string;
    catequista: string;
    encontros: string;
    id_turma: number;
    membros: Crismando[]
}

export type Presenca = {
    idCrismando: number;
    tipoPresenca: TipoPresenca;
    isPresente: boolean;
}

export interface PresencaInput {
  idCrismando: number;
  tipoPresenca: number;
  isPresente: boolean;
}

export enum TipoPresenca {
    CATEQUESE = 1,
    MISSA = 2
}

export type LoginPayload = {
    email: string;
    senha: string;
    nome?: string;
} 