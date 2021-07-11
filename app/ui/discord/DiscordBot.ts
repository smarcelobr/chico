import discord, {Message, Snowflake} from "discord.js";
import * as config from "../../../conf/config.json";
import {IContextManager} from "../../discord/domain/ContextManager";
import {IDiscordYargs} from "./DiscordYargs";

export interface IDiscordBot {
    run(): void;
} 

export class DiscordBot implements IDiscordBot {
    private _bot: discord.Client;

    constructor(private discordYargs: IDiscordYargs, private contextManager: IContextManager, private chicoWebAppBaseUrl: string) {
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

        this._bot.on(discord.Constants.Events.MESSAGE_CREATE, (message) => {
            this.onMessageCreate(message);
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

        if (message.author.bot) return false;

        if (content.includes("@here") || content.includes("@everyone")) return false;

        if (this._bot.user!=undefined && !message.mentions.has(this._bot.user) ) {
            return false;
        }

        // recupera o contexto desse canal
        let channelId = message.channel.id;
        let context = await this.contextManager.getChannelContext(channelId);
        if (context.sala == undefined) {
            // se a sala não foi atribuida ao canal, responde perguntando qual sala de estudos ele quer associar a este canal.
            this.sugerirAssociacaoChannelComSalaExistente(message, channelId);
        } else {

            console.log(content);

            const chico_trigger = /^\s*Chico\W/i;

            if (chico_trigger.test(content)) {

                if (content.trim().endsWith("?")) {
                    /* indica que o Chico deve reagir de alguma forma a essa mensagem
                       Dependendo do que virá a seguir.
                     */

                    message.reply('Eu num intendo nada desses assunto di ciência!', {
                        files: ['assets/chico-feliz.jpg']
                    });
                } else {
                    //message.reply("O qui qui é? Num conheçu essa.");
                    console.log(message.author.id);
                    console.log(message.author.bot);
                    console.log(message.author.tag);
                    console.log(message.author.username);
                }

            }
        }

    }

    private sugerirAssociacaoChannelComSalaExistente(message: Message, channelId: Snowflake) {

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

        message.reply(exampleEmbed);
    }
}