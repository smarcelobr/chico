import {Arguments, Argv, CommandModule} from "yargs";
import {IContextManager} from "../domain/ContextManager";
import {IStringWriter} from "../../cli/IStringWriter";

interface GetSalaArgs {
    channel: string
}

export class GetSala implements CommandModule<{}, GetSalaArgs> {

    constructor(private readonly strWriter: IStringWriter, private readonly _contextManager: IContextManager) {}

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
        try {
            if (args.channel) {
                let ctx = await this._contextManager.getChannelContext(args.channel);
                if (ctx.salaDeEstudos) {
                    await this.strWriter.write("Matéria dessa Sala:\n**" + ctx.salaDeEstudos.estudo.nome + "**");
                } else {
                    await this.strWriter.write("Sem sala criada.");
                }
            } else {
                await this.strWriter.write("Sem canal especifido. ");
            }
        } catch (e) {
            console.error(e);
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

