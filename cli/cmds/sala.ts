import {Arguments, Argv, CommandModule} from "yargs";
import {LsSala} from "./sala_cmds/ls";

export class Sala implements CommandModule {

    get describe(): string | false {
        return "comandos para manipular salas.";
    }

    builder(yargs: Argv<{}>): Argv<{}> {
        return yargs
            .version(false)
            .command(new LsSala())
            .demandCommand().help();
    }

    get command(): ReadonlyArray<string> | string {
        return "sala <command>";
    }

    handler(args: Arguments<{}>): void {
        console.log("sala command!")
    }

}
