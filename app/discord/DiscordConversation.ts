import {DiscordCmdModule} from "./cmds/discordCmdModule";
import {IContextManager} from "./domain/ContextManager";
import {GetSala} from "./cmds/GetSala";
import {SetSala} from "./cmds/SetSala";
import {IStringWriter} from "../cli/IStringWriter";
import {IEstudosDAO} from "../domain/Repositories";
import {PerguntaCmd} from "./cmds/pergunta-cmd";
import {RespondeCmd} from "./cmds/responde-cmd";

export class DiscordConversation {
    private readonly _discordCmdModule: DiscordCmdModule;

    constructor(strWriter: IStringWriter, _contextManager: IContextManager, estudoDao: IEstudosDAO) {
        let _getSalaCmd = new GetSala(strWriter, _contextManager);
        let _setSalaCmd = new SetSala(strWriter, _contextManager, estudoDao);
        let perguntaCmd = new PerguntaCmd(strWriter, _contextManager);
        let respondeCmd = new RespondeCmd(strWriter, _contextManager);
        this._discordCmdModule = new DiscordCmdModule(_getSalaCmd, _setSalaCmd, perguntaCmd, respondeCmd);
    }

    get discordCmdModule(): DiscordCmdModule {
        return this._discordCmdModule;
    }

}