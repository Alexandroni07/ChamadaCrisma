import { Presenca, TurmaData } from "../Pages/types";

export interface ChamadaModalProps {
    modalAberto: boolean;
    setModalAberto: (boolean) => void;
    turmaData: TurmaData;
    isPresente: (number, TipoPresenca) => boolean;
    handleGetPresenca: (Presenca) => void;
}