import {Arguments, Argv, CommandModule} from "yargs";
import {LsSala} from "./sala_cmds/ls";
import {IStringWriter} from "../IStringWriter";

export class Sala implements CommandModule {
    constructor(private readonly lsCmd: LsSala) {

    }


    get describe(): string | false {
        return "comandos para manipular salas.";
    }

    builder = (yargs: Argv<{}>): Argv<{}> => yargs
        .version(false)
        .command(this.lsCmd)
        .demandCommand().help();

    get command(): ReadonlyArray<string> | string {
        return "sala <command>";
    }

    handler = (args: Arguments<{}>): void => {
        console.log("sala command!")
    };

}
