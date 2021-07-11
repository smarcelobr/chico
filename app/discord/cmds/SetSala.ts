import {Arguments, Argv, CommandModule} from "yargs";
import {IContextManager} from "../domain/ContextManager";
import {StringWriter} from "../DiscordConversation";

interface SetSalaArgs {
    channel: string,
    sala: string
}

export class SetSala implements CommandModule<{},SetSalaArgs> {
    constructor(private _contextManager: IContextManager, private readonly strWriter: StringWriter) {}

    get describe(): string | false {
        return "Atribui uma Sala a um canal do discord.";
    }

    get command(): ReadonlyArray<string> | string {
        return "setSala";
    }

    get aliases(): ReadonlyArray<string> | string {
        return "ss";
    }

    handler(args: Arguments<SetSalaArgs>): void {
        this.strWriter.write("discord setSala!")
    }

    builder(yargs: Argv<{}>): Argv<SetSalaArgs> {
        return yargs
            .version(false)
            .option('channel', {
                alias: 'c',
                describe: 'Id do canal no discord',
                type: 'string'
            }).option('sala', {
                alias: 's',
                describe: 'Id da sala de estudos',
                type: 'string'
            }).demandOption(["channel", "sala"], "Especifique o ID do canal do discord e o ID da sala de estudos para associar.")
            .help();
    }

}

