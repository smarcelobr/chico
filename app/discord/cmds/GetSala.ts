import {Arguments, Argv, CommandModule} from "yargs";
import {IContextManager} from "../domain/ContextManager";
import {StringWriter} from "../DiscordConversation";

interface GetSalaArgs {
    channel: string
}

export class GetSala implements CommandModule<{}, GetSalaArgs> {

    constructor(private readonly _contextManager: IContextManager, private readonly strWriter: StringWriter) {}

    get describe(): string | false {
        return "Mostra a Sala que está associada a esse canal do discord.";
    }

    get command(): ReadonlyArray<string> | string {
        return "getSala";
    }

    get aliases(): ReadonlyArray<string> | string {
        return "gs";
    }

    handler = async (args: Arguments<GetSalaArgs>) => {
        await this.strWriter.write("**********discord getSala!**********");
        if (args.channel) {
            await this.strWriter.write("canal "+args.channel);
            let ctx = await this._contextManager.getChannelContext(args.channel);
            if (ctx.sala) {
                await this.strWriter.write("sala "+ctx.sala);
            } else {
                await this.strWriter.write("sem sala");
            }
        } else {
            await this.strWriter.write("Sem canal especifido. ");
        }
    }

    builder(yargs: Argv<{}>): Argv<GetSalaArgs> {
        return yargs
            .version(false)
            .option('channel', {
                type: 'string',
                alias: 'c',
                describe: 'Id do canal no discord',
                demandOption: "Especifique o ID do canal do discord para consulta."
            });
    }

}

