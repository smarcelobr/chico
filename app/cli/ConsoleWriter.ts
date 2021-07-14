import {EmojisEnum, IStringWriter} from "./IStringWriter";
import {Guid} from "../util/Guid";

export class ConsoleWriter implements IStringWriter {
    private readonly _session: string;

    constructor(session: string) {
        this._session = session;
    }

    send(msg: string): Promise<string> {
        return new Promise(resolve => {
            console.info("[MSG "+this._session+"]", msg);
            resolve(Guid.newGuid());
        });
    }

    reply(msg: string): Promise<string> {
        return new Promise(resolve => {
            console.info("[REPLY "+this._session+"]", msg);
            resolve(Guid.newGuid());
        });
    }

    reage(msg: EmojisEnum): Promise<string> {
        return new Promise(resolve => {
            console.info("[REACT "+this._session+"]", msg);
            resolve(Guid.newGuid());
        });
    }

}