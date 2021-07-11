import {AppRootContainer} from "../../AppRootContainer";
import {IContextManager, ContextManager} from "../../discord/domain/ContextManager";
import {DiscordBot, IDiscordBot} from "./DiscordBot";
import {DiscordYargs, IDiscordYargs} from "./DiscordYargs";
import {CliContainer} from "../../cli/CliContainer";

export class UI_DiscordContainer {

    private contextManager: IContextManager;
    private _discordYargs: IDiscordYargs;
    private _discordBot: IDiscordBot;

    constructor(private appRootContainer: AppRootContainer, private cliContainer: CliContainer) {
        this.contextManager = new ContextManager();
        this._discordYargs = new DiscordYargs(cliContainer.discordCmd);
        this._discordBot = new DiscordBot(this._discordYargs, this.contextManager, "http://localhost:8088");
    }

    run() {
        this._discordBot.run();
    }

}