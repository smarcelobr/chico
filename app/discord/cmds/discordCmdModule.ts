import {Arguments, Argv, CommandModule} from "yargs";
import {SetSala} from "./SetSala";
import {GetSala} from "./GetSala";
import {PerguntaCmd} from "./pergunta-cmd";

export class DiscordCmdModule implements CommandModule<{}, {}> {
    constructor(private readonly getSalaCmd: GetSala,
                private readonly setSalaCmd: SetSala,
                private readonly perguntaCmd: PerguntaCmd) {
    }

    get command(): ReadonlyArray<string> | string {
        return "discord <command>";
    }

    get aliases(): ReadonlyArray<string> | string {
        return "d";
    }

    get describe(): string | false {
        return "comandos para o Discord.";
    }

    builder = (yargs: Argv<{}>): Argv<{}> => {
        let y = yargs
            .version(false)
            .command(this.getSalaCmd)
            .command(this.setSalaCmd)
            .command(this.perguntaCmd)
            .demandCommand()
            .help();
        return y;
    }

    handler = (args: Arguments<{}>): void => {
        console.log("discord command!")
    };

}
