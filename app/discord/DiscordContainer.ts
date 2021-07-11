import {AppRootContainer} from "../AppRootContainer";
import {DiscordCmdModule} from "./cmds/discordCmdModule";
import {ContextManager} from "./domain/ContextManager";
import {GetSala} from "./cmds/GetSala";
import {SetSala} from "./cmds/SetSala";

export class DiscordContainer {
    private readonly _discordCmdModule: DiscordCmdModule;
    private readonly _contextManager: ContextManager;
    private readonly _getSalaCmd: GetSala;
    private readonly _setSalaCmd: SetSala;

    constructor(private appRootContainer: AppRootContainer) {
        this._contextManager = new ContextManager();
        this._getSalaCmd = new GetSala(this._contextManager);
        this._setSalaCmd = new SetSala(this._contextManager);
        this._discordCmdModule = new DiscordCmdModule(this._getSalaCmd, this._setSalaCmd);
    }

    get contextManager(): ContextManager {
        return this._contextManager;
    }
    get discordCmdModule(): DiscordCmdModule {
        return this._discordCmdModule;
    }

    get getSalaCmd(): GetSala {
        return this._getSalaCmd;
    }

    get setSalaCmd(): SetSala {
        return this._setSalaCmd;
    }
}