import EventEmitter from "events";
import {IEstudosDAO} from "./domain/Repositories";
import {EstudosJsonDAO} from "./jsonDao/EstudosJsonDAO";
import {UI_DiscordContainer} from "./ui/discord/UI_DiscordContainer";
import {UI_WebappContainer} from "./ui/webapp/UI_WebappContainer";

export class AppRootContainer {
    // declaracao das dependencias globais
    private _estudosDAO: IEstudosDAO;
    private _eventsEmitter: EventEmitter;

    constructor() {
        this._eventsEmitter = new EventEmitter();

        // DAO
        this._estudosDAO = new EstudosJsonDAO();

    }

    get eventsEmitter(): EventEmitter {
        return this._eventsEmitter;
    }

    get estudosDAO(): IEstudosDAO {
        return this._estudosDAO;
    }

}