import {IStringWriter} from "./IStringWriter";

export class ConsoleWriter implements IStringWriter {
    private readonly _session: string;

    constructor(session: string) {
        this._session = session;
    }

    write(msg: string): Promise<void> {
        return new Promise(resolve => {
            console.info("["+this._session+"]", msg);
            resolve();
        });
    }
}