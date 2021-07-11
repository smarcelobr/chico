import {Arguments, Argv, CommandBuilder, CommandModule} from "yargs";
import {SetSala} from "./SetSala";
import {GetSala} from "./GetSala";

export class DiscordCmdModule implements CommandModule<{},{}> {
    constructor(private _getSalaCmd: GetSala, private _setSalaCmd: SetSala) {

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

    get builder(): CommandBuilder<{}, {}> {
        return (yargs: Argv<{}>)=>{
            return yargs
                .version(false)
                .command(this._getSalaCmd)
                .command(this._setSalaCmd)
                .demandCommand().help();
        }
    }

    handler(args: Arguments<{}>): void {
        console.log("discord command!")
    }

}
