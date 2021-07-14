import {Estudo, Questao} from "../../domain/Entities";
import {Snowflake} from "discord.js";

export class SalaDeEstudos {
    private readonly _estudo: Estudo;
    private _membros: Snowflake[] = new Array<Snowflake>(5);
    private _questaoAtiva: Questao | undefined;
    private _questaoMessageId: Snowflake | undefined;

    constructor(estudo: Estudo) {
        this._estudo = estudo;
    }

    get estudo(): Estudo {
        return this._estudo;
    }

    get questaoMessageId(): Snowflake | undefined {
        return this._questaoMessageId;
    }

    set questaoMessageId(value: Snowflake | undefined) {
        this._questaoMessageId = value;
    }
    get questaoAtiva(): Questao | undefined {
        return this._questaoAtiva;
    }

    set questaoAtiva(value: Questao | undefined) {
        this._questaoAtiva = value;
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