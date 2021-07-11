import yargs, {Arguments} from "yargs";
import {DiscordCmdModule} from "../../discord/cmds/discordCmdModule";

export interface IDiscordYargs {
    cli(args: string): void;
}

export class DiscordYargs implements IDiscordYargs {

    private yargsBot: yargs.Argv<{}>;

    constructor(discordCmd: DiscordCmdModule) {
        this.yargsBot = yargs
            .command(discordCmd)
            .version("0.0.1")
            .help()
            .fail(function (msg, err, yargs) {
                if (err) throw err // preserve stack
                console.error('You broke it!')
                console.error(msg)
                console.error('You should be doing', yargs.help())
            })
            .showHelpOnFail(true, "falhou mano.")
            .demandCommand()
            .exitProcess(false);
    }

    cli(args: string): void {
        this.yargsBot.parse(args);
    }
}