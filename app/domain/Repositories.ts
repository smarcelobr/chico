import {EstudoSintese} from "./Entities";

export interface IEstudosDAO {

    getAllEstudos(): Promise<EstudoSintese[]>;
}

