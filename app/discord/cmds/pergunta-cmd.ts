import {Arguments, Argv, CommandModule} from "yargs";
import {IStringWriter} from "../../cli/IStringWriter";
import {IEstudosDAO} from "../../domain/Repositories";
import {IContextManager} from "../domain/ContextManager";
import {NumberUtil} from "../../util/NumberUtil";

interface PerguntaCmdArgs {
    channel: string
}

export class PerguntaCmd implements CommandModule<{}, PerguntaCmdArgs> {
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

    builder = async (yargs: Argv<{}>): Promise<Argv<PerguntaCmdArgs>> => {
        return yargs
            .version(false)
            .option('channel', {
                type: 'string',
                alias: 'c',
                describe: 'Id do canal para perguntar',
                demandOption: "Especifique o ID do canal do discord para perguntar."
            });
    }

    handler = async (args: Arguments<PerguntaCmdArgs>): Promise<void> => {
        try {
            let chCtx = await this.contextManager.getChannelContext(args.channel);
            if (chCtx.salaDeEstudos) {
                let estudo = chCtx.salaDeEstudos.estudo;
                let idxSorteio = NumberUtil.randomInteger(0, estudo.questoes.length-1);
                let questao = estudo.questoes[idxSorteio];
                let msg = questao.pergunta+"\n"+questao.opcoes.map((opc, ix)=>`${ix} - ${opc.content};`).join("\n");
                await this.strWriter.write(msg);
            } else {
                await this.strWriter.write("Necessário atribuir uma matéria a esse canal. Use o comando `discord setSala <id da Materia>`");
            }
        } catch (e) {
            console.error(e);
        }
    };

}

