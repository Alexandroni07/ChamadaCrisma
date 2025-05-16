import { Crismando, Presenca, TurmaData } from "../Pages/types";

export interface ChamadaModalProps {
    modalAberto: boolean;
    setModalAberto: (boolean) => void;
    crismandos: Crismando[];
    isPresente: (number, TipoPresenca) => boolean | null;
    handleGetPresenca: (Presenca) => void;
}