import * as yargs from "yargs";
import {Client, Message} from "discord.js";
import {DiscordConversation} from "../../discord/DiscordConversation";
import {IContextManager} from "../../discord/domain/ContextManager";
import {EmojisEnum, IStringWriter} from "../../cli/IStringWriter";
import {CliContainer} from "../../cli/CliContainer";
import {IEstudosDAO} from "../../domain/Repositories";
import {channel} from "diagnostic_channel";
import Yargs from "yargs/yargs";
import EventEmitter from "events";
import {StringUtil} from "../../util/StringUtil";

export interface IDiscordYargs {
    cli(bot: Client, message: Message): void;
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
                await botMessageWriter.reply('*You broke it!*\n' + msg + '\nYou should be doing ' + pYargs.help());
            })
            .demandCommand()
            .strict(true)
            .exitProcess(false)
    }

    cli = (bot: Client, message: Message): void => {
        let that = this;

        let comando = message.content;
        /* sanitiza a mensagem recebida:
        - Elimina a referencia para self, se houver;
         */
        if (bot.user) {
            let botReference = new RegExp(StringUtil.escapeForRegex("<@!?" + bot.user.id + ">"));
            comando = comando.replace(botReference, '').trim();
        }

        let botMessageWriter: IStringWriter = new class implements IStringWriter {
            send(msg: string): Promise<string> {
                return new Promise(async resolve => {
                    console.log("[MSG " + message.id + "]", msg);
                    let messageObj = await message.channel.send(msg);
                    resolve(messageObj.id);
                });
            }

            reply(msg: string): Promise<string> {
                return new Promise(async resolve => {
                    console.log("[REPLY " + message.id + "]", msg);
                    let replyMessage = await message.reply(msg);
                    resolve(replyMessage.id);
                });
            }

            reage(emoji: EmojisEnum): Promise<string> {
                return new Promise(async resolve => {
                    console.log("[REAGE " + message.id + "]", emoji);
                    let msgReaction = await message.react(emoji);
                    resolve(msgReaction.message.id);
                });
            }

        }

        let args = this.createParser(botMessageWriter).parseAsync(comando, {
                channel: message.channel.id,
                message: message.id,
                author: message.author.id
            },
            async (err, argv, output) => {
                if (err) {
                    console.log('err>', err);
                }
                if (output) {
                    await botMessageWriter.reply(output);
                }
            });

        args.catch(async (a) => {
            console.log("[ERR " + message.id + "]", a);
            await message.reply("deu ruim!");
        });
    };
}