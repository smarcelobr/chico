import {Arguments, CommandModule} from "yargs";
import {IStringWriter} from "../../IStringWriter";
import {IEstudosDAO} from "../../../domain/Repositories";

export class LsSala implements CommandModule {
    constructor(private readonly strWriter: IStringWriter, private readonly estudosDAO: IEstudosDAO) {}

    get describe(): string | false {
        return "lista as salas ativas.";
    }

    get command(): ReadonlyArray<string> | string {
        return "list";
    }

    get aliases(): ReadonlyArray<string> | string {
        return ["ls","dir"];
    }

    handler = async (args: Arguments): Promise<void> => {
        try {
            let estudos = await this.estudosDAO.getAllEstudos();
            let msg;
            msg = estudos.map(estudo => "- `" + estudo.id + "`: **" + estudo.nome + "**;").join("\n");
            await this.strWriter.write(msg);
        } catch (e) {
            console.error(e);
        }
    };

}

