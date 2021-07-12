import {Snowflake} from "discord.js";
import {ChannelContext} from "./DiscordContext";

interface ChannelContextMap {
    [channelId: string]: ChannelContext;
}

export interface IContextManager {
    /**
     * obtem ou cria um contexto para esse canal do discord
     * @param channelId id do canal do discord
     */
    getChannelContext(channelId: Snowflake): Promise<ChannelContext>;
}

export class ContextManager implements IContextManager {

    private readonly channelContextMap: ChannelContextMap;

    constructor() {
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

}