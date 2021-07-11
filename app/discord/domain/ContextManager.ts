import {Snowflake} from "discord.js";
import {ChannelContext, IChannelContext} from "./DiscordContext";

interface ChannelContextMap {
    [channelId: string]: IChannelContext;
}

export interface IContextManager {
    getChannelContext(channelId: Snowflake): Promise<IChannelContext>;
}

export class ContextManager implements IContextManager {

    private readonly channelContextMap: ChannelContextMap;

    constructor() {
        this.channelContextMap = {};
    }

    getChannelContext(channelId: Snowflake): Promise<IChannelContext> {
        return new Promise<IChannelContext>(((resolve, reject) => {
            let channelCtx = this.channelContextMap[channelId];
            if (!channelCtx) {
                channelCtx = new ChannelContext();
                this.channelContextMap[channelId] = channelCtx;
            }
            resolve(channelCtx);
        }))
    }

}