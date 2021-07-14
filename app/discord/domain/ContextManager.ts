import {Snowflake} from "discord.js";
import {ChannelContext} from "./DiscordContext";
import {Questao} from "../../domain/Entities";
import EventEmitter from "events";

interface ChannelContextMap {
    [channelId: string]: ChannelContext;
}

interface IContextManagerEvents {
    /**
     * Indica que o Bot respondeu uma mensagem.
     *
     * @param messageId id da mensagem que foi respondida
     * @param replyId id da mensagem com a resposta
     */
    'onBotReply': (messageId: Snowflake, replyId: String) => void; /* não é usado... eliminar. Deixei, por enquanto, como modelo. */
}

export interface IContextManager {
    /**
     * obtem ou cria um contexto para esse canal do discord
     * @param channelId id do canal do discord
     */
    getChannelContext(channelId: Snowflake): Promise<ChannelContext>;

    setQuestaoAtiva(channelId: Snowflake, message: Snowflake, questao: Questao): Promise<void>;

    on<U extends keyof IContextManagerEvents>(
        event: U, listener: IContextManagerEvents[U]
    ): this;

    emit<U extends keyof IContextManagerEvents>(
        event: U, ...args: Parameters<IContextManagerEvents[U]>
    ): boolean;
}

export class ContextManager extends EventEmitter implements IContextManager {

    private readonly channelContextMap: ChannelContextMap;

    constructor() {
        super();
        this.channelContextMap = {};
    }

    getChannelContext(channelId: Snowflake): Promise<ChannelContext> {
        return new Promise<ChannelContext>(((resolve, reject) => {
            let channelCtx = this.channelContextMap[channelId];
            if (!channelCtx) {
                channelCtx = new ChannelContext(channelId);
                this.channelContextMap[channelId] = channelCtx;
            }
            resolve(channelCtx);
        }))
    }

    setQuestaoAtiva = async (channelId: Snowflake, messageId: Snowflake, questao: Questao): Promise<void> => {
        let chCtx = await this.getChannelContext(channelId);
        if (chCtx.salaDeEstudos) {
            chCtx.salaDeEstudos.questaoAtiva = questao;
            chCtx.salaDeEstudos.questaoMessageId = messageId;
        }
    };

}