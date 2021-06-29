import discord, {Message, Snowflake} from "discord.js";
import * as config from "../../conf/config.json";
import {ISalaManager} from "./EstudoManager";

export interface IDiscordBot {
    run(): void;
} 

export class DiscordBot implements IDiscordBot {
    private _bot: discord.Client;

    constructor(private salaManager: ISalaManager, private chicoWebAppBaseUrl: string) {
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

    private onMessageCreate(message: Message) {

        // é para eu processar essa mensagem?
        const content = message.content;

        if (message.author.bot) return false;

        if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

        if (this._bot.user!=undefined && !message.mentions.has(this._bot.user) ) {
            return false;
        }

        // busca a Sala de Estudos associado a esse canal
        let channelId = message.channel.id;
        let sala = this.salaManager.fromDiscordChannel(channelId);

        if (sala == undefined) {
            // se não for encontrado, responde perguntando qual sala de estudos ele quer associar a este canal.
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

        let url = this.chicoWebAppBaseUrl + '/discord?channelId=' + encodeURIComponent(channelId);
        const exampleEmbed = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('O que iremos estudar hoje?')
            .setURL(this.chicoWebAppBaseUrl)
            .setAuthor('Chico BOT', 'https://i.imgur.com/wSTFkRM.png', this.chicoWebAppBaseUrl)
            .setDescription('Olá, O que vamos estudar hoje? [Escolha uma sala de estudos para esse canal](' + url+' \'Clique para atribuir sala de estudos\').')
            .setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .addField('Inline field title', 'Some value here', true)
            .setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

        message.reply(exampleEmbed);
    }
}