import {Sala} from "./cmds/sala";
import {IStringWriter} from "./IStringWriter";
import {LsSala} from "./cmds/sala_cmds/ls";
import {IEstudosDAO} from "../domain/Repositories";

export class CliContainer {
    private readonly _salaCmd: Sala;

    constructor(private strWriter: IStringWriter, estudosDAO: IEstudosDAO) {
        let ls = new LsSala(strWriter, estudosDAO);
        this._salaCmd = new Sala(ls);
    }

    get salaCmd(): Sala {
        return this._salaCmd;
    }

}