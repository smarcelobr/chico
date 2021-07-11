import EventEmitter from "events";
import {IEstudosDAO} from "./domain/Repositories";
import {EstudosJsonDAO} from "./jsonDao/EstudosJsonDAO";
import {ContextManager} from "./discord/domain/ContextManager";

export class AppRootContainer {
    // declaracao das dependencias globais
    private readonly _contextManager: ContextManager
    private readonly _estudosDAO: IEstudosDAO;
    private readonly _eventsEmitter: EventEmitter;

    constructor() {
        this._eventsEmitter = new EventEmitter();

        // DAO
        this._estudosDAO = new EstudosJsonDAO();

        this._contextManager = new ContextManager();
    }

    get eventsEmitter(): EventEmitter {
        return this._eventsEmitter;
    }

    get estudosDAO(): IEstudosDAO {
        return this._estudosDAO;
    }

    get contextManager(): ContextManager {
        return this._contextManager;
    }
}