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

    private static parseCallback(err: Error | undefined, argv: yargs.Arguments | Promise<yargs.Arguments>, output: string) {
        console.log("---------------------------------");
        console.log("parse callback - begin");
        console.log(err);
        console.log(output);
        console.log(JSON.stringify(argv));
        console.log("parse callback - end");
        //message.reply('Eu estou aprendendo ainda...');
    };

    private createParser(message: Message): yargs.Argv<{}> {

        let botMessageWriter: IStringWriter = new class implements IStringWriter {
            write(msg: string): Promise<void> {
                return new Promise(async resolve => {
                    console.log("[REPLY]", msg);
                    await message.reply(msg);
                    resolve();
                });
            }
        }

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

        let args = this.createParser(message).parseAsync(comando, {
                channel: message.channel.id
            },
            (...c_args) => {
                DiscordYargs.parseCallback(...c_args);
            });

        args.catch(async (a) => {
            console.log("[ERR " + message.id + "]", a);
            await message.reply("deu ruim!");
        });
    };
}