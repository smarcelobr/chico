import {AppRootContainer} from "../../AppRootContainer";
import {ISalaManager, SalaManager} from "./EstudoManager";
import {DiscordBot, IDiscordBot} from "./DiscordBot";

export class UI_DiscordContainer {

    private _salaManager: ISalaManager;
    private _discordBot: IDiscordBot;

    constructor(private appRootContainer: AppRootContainer) {
        this._salaManager = new SalaManager(appRootContainer.estudosDAO);
        this._discordBot = new DiscordBot(this._salaManager, "http://localhost:8088");
    }

    run() {
        this._discordBot.run();
    }

}