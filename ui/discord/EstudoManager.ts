import {EstudoSintese, SalaDeEstudosDiscord} from "../../domain/Entities"
import {Snowflake} from "discord.js";
import {IEstudosDAO} from "../../domain/Repositories";

interface DiscordChannelSalaEstudosMap {
    [channelId: string]: SalaDeEstudosDiscord;
}

export interface ISalaManager {
    fromDiscordChannel(channelId: Snowflake): SalaDeEstudosDiscord|undefined;
}

export class SalaManager implements ISalaManager {

    private _sala: DiscordChannelSalaEstudosMap;

    constructor(private estudosDAO: IEstudosDAO) {
        this._sala = {};
    }

    fromDiscordChannel(channelId: Snowflake): SalaDeEstudosDiscord|undefined {
        return this._sala[channelId];
    }

}