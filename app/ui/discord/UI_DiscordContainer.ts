import {ContextManager, IContextManager} from "../../discord/domain/ContextManager";
import {DiscordBot, IDiscordBot} from "./DiscordBot";
import {DiscordYargs, IDiscordYargs} from "./DiscordYargs";
import {AppRootContainer} from "../../AppRootContainer";
import {IEstudosDAO} from "../../domain/Repositories";

export class UI_DiscordContainer {

    private readonly _discordBot: IDiscordBot;

    constructor(estudoDao: IEstudosDAO) {
        let contextManager = new ContextManager();
        let _discordYargs = new DiscordYargs(contextManager, estudoDao);
        this._discordBot = new DiscordBot(_discordYargs, contextManager, "http://localhost:8088");
    }

    run() {
        this._discordBot.run();
    }

}