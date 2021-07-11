import {AppRootContainer} from "../AppRootContainer";
import {Sala} from "./cmds/sala";
import {DiscordCmdModule} from "../discord/cmds/discordCmdModule";
import {DiscordContainer} from "../discord/DiscordContainer";

export class CliContainer {
    private readonly _salaCmd: Sala;
    private readonly _discordCmd: DiscordCmdModule;

    constructor(private discordContainer: DiscordContainer, private appRootContainer: AppRootContainer) {
        this._salaCmd = new Sala();
        this._discordCmd = discordContainer.discordCmdModule;
    }

    get salaCmd(): Sala {
        return this._salaCmd;
    }

    get discordCmd(): DiscordCmdModule {
        return this._discordCmd;
    }
}