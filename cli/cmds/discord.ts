import {Arguments, Argv, CommandModule} from "yargs";
import {SetSala} from "./discord_cmds/SetSala";
import {GetSala} from "./discord_cmds/GetSala";

export class Discord implements CommandModule<{},{}> {

    get command(): ReadonlyArray<string> | string {
        return "discord <command>";
    }

    get aliases(): ReadonlyArray<string> | string {
        return "d";
    }

    get describe(): string | false {
        return "comandos para o Discord.";
    }

    builder(yargs: Argv<{}>): Argv<{}> {
        return yargs
            .version(false)
            .command(new SetSala())
            .command(new GetSala())
            .demandCommand().help();
    }

    handler(args: Arguments<{}>): void {
        console.log("discord command!")
    }

}
