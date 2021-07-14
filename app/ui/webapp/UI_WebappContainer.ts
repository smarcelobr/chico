import {AppRootContainer} from "../../AppRootContainer";
import {ChicoBackend} from "./chicoBackend";

export class UI_WebappContainer {
    private _server: ChicoBackend;

    constructor(private appRootContainer: AppRootContainer) {
        this._server = new ChicoBackend();
    }

    run() {
        this._server.run();
    }

}