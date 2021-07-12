import {Estudo} from "../../domain/Entities";
import {Snowflake} from "discord.js";

export class SalaDeEstudos {
    private readonly _estudo: Estudo;
    private _membros: Snowflake[] = new Array<Snowflake>(5);

    constructor(estudo: Estudo) {
        this._estudo = estudo;
    }

    get estudo(): Estudo {
        return this._estudo;
    }

    addMember = (memberId: Snowflake) => {
        let index = this._membros.findIndex((id)=>id===memberId);
        if (index>=0) {
            this._membros.push(memberId);
        }
    }
}

export class ChannelContext {

    private readonly _channelId: Snowflake;
    private _salaDeEstudos: SalaDeEstudos | undefined;

    constructor(channelId: Snowflake) {
        this._channelId = channelId;
    }

    get channelId(): Snowflake {
        return this._channelId;
    }

    get salaDeEstudos(): SalaDeEstudos|undefined {
        return this._salaDeEstudos;
    }

    set salaDeEstudos(value: SalaDeEstudos | undefined) {
        this._salaDeEstudos = value;
    }
}