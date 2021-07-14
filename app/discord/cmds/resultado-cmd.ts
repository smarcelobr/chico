import {Arguments, Argv, CommandModule} from "yargs";
import {IStringWriter} from "../../cli/IStringWriter";
import {IEstudosDAO} from "../../domain/Repositories";
import {IContextManager} from "../domain/ContextManager";
import {NumberUtil} from "../../util/NumberUtil";
import {channel} from "diagnostic_channel";
import {Snowflake} from "discord.js";

interface ResultadoCmdArgs {
    channel: Snowflake,
    message: Snowflake
}

/**
 * Apresenta o resultado de todos os participantes do teste.
 */
export class ResultadoCmd implements CommandModule<{}, ResultadoCmdArgs> {
    constructor(private readonly strWriter: IStringWriter,
                private readonly contextManager: IContextManager) {
    }

    get describe(): string | false {
        return "Pergunta um questão aleatória dessa sala de estudo.";
    }

    get command(): ReadonlyArray<string> | string {
        return "pergunta";
    }

    get aliases(): ReadonlyArray<string> | string {
        return ["p"];
    }

    builder = async (yargs: Argv<{}>): Promise<Argv<ResultadoCmdArgs>> => {
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
            });
    }

    handler = async (args: Arguments<ResultadoCmdArgs>): Promise<void> => {
        try {
            let chCtx = await this.contextManager.getChannelContext(args.channel);
            if (chCtx.salaDeEstudos) {
                let estudo = chCtx.salaDeEstudos.estudo;
                let idxSorteio = NumberUtil.randomInteger(0, estudo.questoes.length-1);
                let questao = estudo.questoes[idxSorteio];
                let msg = questao.pergunta+"\n"+questao.opcoes.map((opc, ix)=>`${ix} - ${opc.content};`).join("\n");
                let idMsg = await this.strWriter.reply(msg);
                await this.contextManager.setQuestaoAtiva(args.channel, idMsg, questao);
            } else {
                await this.strWriter.reply("Necessário atribuir uma matéria a esse canal. Use o comando `discord setSala <id da Materia>`");
            }
        } catch (e) {
            console.error(e);
        }
    };

}

