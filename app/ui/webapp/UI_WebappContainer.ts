import {AppRootContainer} from "../../AppRootContainer";
import {ChicoBackend} from "./chicoBackend";

export class UI_WebappContainer {
    private _server: ChicoBackend;

    constructor(private appRootContainer: AppRootContainer) {
        this._server = new ChicoBackend(appRootContainer.eventsEmitter);
    }

    run() {
        this._server.run();
    }

}