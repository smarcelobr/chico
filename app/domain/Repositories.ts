import {Estudo, EstudoSintese} from "./Entities";

export interface IEstudosDAO {

    getAllEstudos(): Promise<EstudoSintese[]>;

    obterEstudoPorId(estudoId: string): Promise<Estudo|undefined>;
}

