import {AppRootContainer} from "../AppRootContainer";
import {Sala} from "./cmds/sala";
import {DiscordCmdModule} from "../discord/cmds/discordCmdModule";
import {DiscordConversation} from "../discord/DiscordConversation";

export class CliContainer {
    private readonly _salaCmd: Sala;

    constructor(private appRootContainer: AppRootContainer) {
        this._salaCmd = new Sala();
    }

    get salaCmd(): Sala {
        return this._salaCmd;
    }

}