import yargs, {Arguments} from "yargs";
import {Message} from "discord.js";
import {DiscordConversation, StringWriter} from "../../discord/DiscordConversation";
import {IContextManager} from "../../discord/domain/ContextManager";

export interface IDiscordYargs {
    cli(message: Message): void;
}

export class DiscordYargs implements IDiscordYargs {

    constructor(private readonly _contextManager: IContextManager) {
    }

    private static parseCallback(err: Error | undefined, argv: Arguments | Promise<Arguments>, output: string) {
        console.log("---------------------------------");
        console.log("parse callback - begin");
        console.log(err);
        console.log(output);
        console.log(JSON.stringify(argv));
        console.log("parse callback - end");
        //message.reply('Eu estou aprendendo ainda...');
    };

    cli = (message: Message): void => {

        let comando = message.content.substr(message.content.indexOf(" ") + 1);

        let botMessageWriter: StringWriter = new class implements StringWriter {
            write(msg: string): Promise<void> {
                return new Promise(async resolve => {
                    console.log("[REPLY " + message.id + "]", msg);
                    await message.reply(msg);
                    resolve();
                });
            }
        }

        let discordConversation = new DiscordConversation(this._contextManager, botMessageWriter);

        let yargsBot = yargs
            .command(discordConversation.discordCmdModule)
            .version("0.0.1")
            .help()
            .fail(async function (msg, err, yargs) {
                if (err) throw err; // preserve stack
                await botMessageWriter.write('You broke it!');
                await botMessageWriter.write(msg);
                await botMessageWriter.write('You should be doing ' + yargs.help());
            })
            .demandCommand()
            .strict(true)
            .exitProcess(false);

        let args = yargsBot.parseAsync(comando, {
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