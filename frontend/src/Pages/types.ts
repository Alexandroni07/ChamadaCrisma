export type DataResultGenericService<T> = {
    data: T
    total?: number;
    status?: number;
};

export type Crismando = {
    nome: string;
    id_turma: number;
    telefone: string;
    email: string;
    responsavel: string;
}