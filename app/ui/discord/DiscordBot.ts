import discord, {Message, Snowflake} from "discord.js";
import * as config from "../../../conf/config.json";
import {IContextManager} from "../../discord/domain/ContextManager";
import {IDiscordYargs} from "./DiscordYargs";

export interface IDiscordBot {
    run(): void;
} 

export class DiscordBot implements IDiscordBot {
    private _bot: discord.Client;

    constructor(private dargs: IDiscordYargs, private contextManager: IContextManager, private chicoWebAppBaseUrl: string) {
        this._bot = new discord.Client();

        this._bot.on(discord.Constants.Events.DEBUG, (msg) => {
            if (!msg.includes("Heartbeat")) {
                console.log('DEBUG ' + msg);
            }
        } );

        this._bot.once(discord.Constants.Events.CLIENT_READY, () => {
            console.log('Chico BOT está pronto para ser usado.');
        });

        this._bot.on(discord.Constants.Events.CHANNEL_CREATE, () => {
            console.log('Chico BOT está pronto para ser usado.');
        });

        this._bot.on(discord.Constants.Events.MESSAGE_CREATE, async (message) => {
            await this.onMessageCreate(message);
        });

    }

    run() {
        this._bot.login(config.token)
            .then( () => {
                console.log('Bot Logado!');
            })
            .catch((err) => {
                console.log('deu erro no login. :(');
                console.log(err)
            });
    }

    private async onMessageCreate(message: Message) {

        // é para eu processar essa mensagem?
        const content = message.content;
        console.log("[MSG "+message.id+"]",content);

        if (message.author.bot) return false;

        if (content.includes("@here") || content.includes("@everyone")) return false;

        if (this._bot.user!=undefined && !message.mentions.has(this._bot.user) ) {
            return false;
        }

        if (message.reference) {
            console.log(message.reference.messageID)
        }

        this.dargs.cli(this._bot, message);
    }

    private async sugerirAssociacaoChannelComSalaExistente(message: Message, channelId: Snowflake) {

        let url = this.chicoWebAppBaseUrl + '/discord/setChannel?userId='+encodeURIComponent(message.author.id)+'&channelId=' + encodeURIComponent(channelId);
        const exampleEmbed = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('O que iremos estudar nesse canal? :slight_smile:')
            .setURL(url)
            //.setAuthor('Chico BOT', 'https://i.imgur.com/wSTFkRM.png', this.chicoWebAppBaseUrl)
            .setDescription(`Olá ${message.author}.
              Vamos começar a estudar? Para iniciar, eu preciso saber qual é a sala de estudos desse canal. 
              Clique no título dessa mensagem para realizar essa atribuição no nosso site ou use um ou mais dos comandos abaixos 
              para realizar essa atribuição aqui mesmo no canal.`)
            .setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .addFields(
                { name: 'Regular field title 0', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title 1', value: 'Some value here', inline: true },
                { name: 'Inline field title 2', value: 'Some value here', inline: true },
            )
            .addField('Inline field title 3', 'Some value here', true)
            .setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

        await message.reply(exampleEmbed);
    }
}