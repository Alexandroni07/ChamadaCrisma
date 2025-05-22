export type Catequista = {
  id: number;
  nome: string;
  id_turma: number;
};

export type CatequistaContextType = {
  catequista: Catequista | null;
  setCatequista: (c: Catequista | null) => void;
};