import {AppRootContainer} from "../AppRootContainer";
import {Sala} from "./cmds/sala";
import {Discord} from "./cmds/discord";

export class CliContainer {
    private _salaCmd: Sala;
    private _discordCmd: Discord;

    constructor(private appRootContainer: AppRootContainer) {
        this._salaCmd = new Sala();
        this._discordCmd = new Discord();
    }

    get salaCmd(): Sala {
        return this._salaCmd;
    }

    get discordCmd(): Discord {
        return this._discordCmd;
    }
}