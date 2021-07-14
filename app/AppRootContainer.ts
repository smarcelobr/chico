import EventEmitter from "events";
import {IEstudosDAO} from "./domain/Repositories";
import {EstudosJsonDAO} from "./jsonDao/EstudosJsonDAO";
import {ContextManager} from "./discord/domain/ContextManager";

export class AppRootContainer {
    // declaracao das dependencias globais
    private readonly _contextManager: ContextManager
    private readonly _estudosDAO: IEstudosDAO;

    constructor() {
        // DAO
        this._estudosDAO = new EstudosJsonDAO("D:\\smarc\\Projetos\\smarcelobr\\chico\\dados\\estudos");

        this._contextManager = new ContextManager();
    }

    get estudosDAO(): IEstudosDAO {
        return this._estudosDAO;
    }

    get contextManager(): ContextManager {
        return this._contextManager;
    }
}