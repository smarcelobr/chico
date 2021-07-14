import {Arguments, Argv, CommandModule} from "yargs";
import {EmojisEnum, IStringWriter} from "../../cli/IStringWriter";
import {IContextManager} from "../domain/ContextManager";
import {NumberUtil} from "../../util/NumberUtil";
import {channel} from "diagnostic_channel";
import {Snowflake} from "discord.js";

interface RespondeCmdArgs {
    channel: Snowflake,
    message: Snowflake
    author: Snowflake
}

/**
 * Recebe uma resposta de um participante.
 */
export class RespondeCmd implements CommandModule<{}, RespondeCmdArgs> {
    constructor(private readonly strWriter: IStringWriter,
                private readonly contextManager: IContextManager) {
    }

    get describe(): string | false {
        return "Resposta a uma questão dessa sala de estudo.";
    }

    get command(): ReadonlyArray<string> | string {
        return "resposta";
    }

    get aliases(): ReadonlyArray<string> | string {
        return ["r"];
    }

    builder = async (yargs: Argv<{}>): Promise<Argv<RespondeCmdArgs>> => {
        return yargs
            .version(false)
            .option('channel', {
                type: 'string',
                alias: 'c',
                describe: 'Id do canal para perguntar',
                demandOption: "Especifique o ID do canal do discord para perguntar."
            }).option('message', {
                type: 'string',
                alias: 'm',
                describe: 'Id do message do comando',
                demandOption: "Especifique o ID da mensagem que solicitou a pergunta."
            }).option('author', {
                type: 'string',
                alias: 'a',
                describe: 'Id do participante que respondeu',
                demandOption: "Especifique o ID do usuário que respondeu."
            });
    }

    handler = async (args: Arguments<RespondeCmdArgs>): Promise<void> => {
        try {
            let chCtx = await this.contextManager.getChannelContext(args.channel);
            if (chCtx.salaDeEstudos) {
                if (chCtx.salaDeEstudos.questaoMessageId==args.message) {
                    let idMsg = await this.strWriter.reage(EmojisEnum.thumbsup);
                } else {
                    await this.strWriter.reply("Precisa responder a uma questão ativa.");
                }
            } else {
                await this.strWriter.reply("Necessário ter uma questão ativa.");
            }
        } catch (e) {
            console.error(e);
        }
    };

}

