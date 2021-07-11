import {DiscordCmdModule} from "./cmds/discordCmdModule";
import {IContextManager} from "./domain/ContextManager";
import {GetSala} from "./cmds/GetSala";
import {SetSala} from "./cmds/SetSala";

export interface StringWriter {
    write: (msg:string) => Promise<void>;
}

export class DiscordConversation {
    private readonly _discordCmdModule: DiscordCmdModule;
    private readonly _getSalaCmd: GetSala;
    private readonly _setSalaCmd: SetSala;

    constructor(private readonly _contextManager: IContextManager, strWriter: StringWriter) {
        this._getSalaCmd = new GetSala(this._contextManager, strWriter);
        this._setSalaCmd = new SetSala(this._contextManager, strWriter);
        this._discordCmdModule = new DiscordCmdModule(this._getSalaCmd, this._setSalaCmd);
    }

    get discordCmdModule(): DiscordCmdModule {
        return this._discordCmdModule;
    }

}