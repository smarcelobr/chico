import * as yargs from "yargs";
import {Message} from "discord.js";
import {DiscordConversation} from "../../discord/DiscordConversation";
import {IContextManager} from "../../discord/domain/ContextManager";
import {IStringWriter} from "../../cli/IStringWriter";
import {CliContainer} from "../../cli/CliContainer";
import {IEstudosDAO} from "../../domain/Repositories";
import {channel} from "diagnostic_channel";
import Yargs from "yargs/yargs";

export interface IDiscordYargs {
    cli(message: Message): void;
}

export class DiscordYargs implements IDiscordYargs {

    constructor(private readonly _contextManager: IContextManager,
                private readonly estudoDao: IEstudosDAO
                ) {

    }

    private createParser(botMessageWriter: IStringWriter): yargs.Argv<{}> {

        let discordConversation = new DiscordConversation(botMessageWriter, this._contextManager, this.estudoDao);
        let cliContainer = new CliContainer(botMessageWriter, this.estudoDao);

        return Yargs()
            .scriptName('>')
            .command(cliContainer.salaCmd)
            .command(discordConversation.discordCmdModule)
            .version("0.0.1")
            .help()
            .fail(async function (msg, err, pYargs) {
                if (err) throw err; // preserve stack
                await botMessageWriter.write('*You broke it!*\n'+msg+'\nYou should be doing '+pYargs.help());
            })
            .demandCommand()
            .strict(true)
            .exitProcess(false)
    }

    cli = (message: Message): void => {
        let comando = message.content.substr(message.content.indexOf(" ") + 1);

        let botMessageWriter: IStringWriter = new class implements IStringWriter {
            write(msg: string): Promise<void> {
                return new Promise(async resolve => {
                    console.log("[REPLY "+message.id+"]", msg);
                    await message.reply(msg);
                    resolve();
                });
            }
        }

        let args = this.createParser(botMessageWriter).parseAsync(comando, {
                channel: message.channel.id
            },
            async (err, argv, output) => {
                console.log('err>',err);
                if (output) {
                    await botMessageWriter.write(output);
                }
            });

        args.catch(async (a) => {
            console.log("[ERR " + message.id + "]", a);
            await message.reply("deu ruim!");
        });
    };
}