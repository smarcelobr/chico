import {Arguments, Argv, CommandModule} from "yargs";
import {IContextManager} from "../domain/ContextManager";
import {SalaDeEstudos} from "../domain/DiscordContext";
import {IStringWriter} from "../../cli/IStringWriter";
import {channel} from "diagnostic_channel";
import {IEstudosDAO} from "../../domain/Repositories";
import {Estudo} from "../../domain/Entities";

interface SetSalaArgs {
    channel: string,
    sala: string
}

export class SetSala implements CommandModule<{},SetSalaArgs> {
    constructor(private readonly strWriter: IStringWriter,
                private readonly _contextManager: IContextManager,
                private readonly estudoDao: IEstudosDAO
                ) {}

    get describe(): string | false {
        return "Atribui uma Sala a um canal do discord.";
    }

    get command(): ReadonlyArray<string> | string {
        return "setSala";
    }

    get aliases(): ReadonlyArray<string> | string {
        return "ss";
    }

    handler = async (args: Arguments<SetSalaArgs>): Promise<void> => {
        try {
            let estudo = await this.estudoDao.obterEstudoPorId(args.sala);
            if (estudo) {
                let channelCtx = await this._contextManager.getChannelContext(args.channel);
                channelCtx.salaDeEstudos = new SalaDeEstudos(estudo);

                await this.strWriter.write(`A matéria escolhida foi:\n**${estudo.nome}** !`);
            } else {
                await this.strWriter.write(`Estudo id=${args.sala} não existe.`)
            }
        } catch (e) {
            console.error(e);
        }
    };

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

