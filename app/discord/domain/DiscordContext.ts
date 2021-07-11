import {Estudo} from "../../domain/Entities";
import {Snowflake} from "discord.js";

export interface SalaDeEstudos {
    estudo: Estudo;
    channelId: Snowflake;
    membros: Snowflake[];
}

export interface IChannelContext {
    sala: SalaDeEstudos|undefined;
}

export class ChannelContext implements IChannelContext {

    private _salaDeEstudos: SalaDeEstudos | undefined;

    get sala(): SalaDeEstudos|undefined {
        return this._salaDeEstudos;
    }

}