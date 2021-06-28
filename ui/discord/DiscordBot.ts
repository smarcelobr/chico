import discord from "discord.js";
import * as config from "../../conf/config.json";
import {ISalaManager} from "./EstudoManager";

export interface IDiscordBot {
    run(): void;
} 

export class DiscordBot implements IDiscordBot {
    private _bot: discord.Client;

    constructor(private salaManager: ISalaManager) {
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
            const content = message.content;

            if (message.author.bot) return false;

            if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

            if (this._bot.user!=undefined && !message.mentions.has(this._bot.user) ) {
            	return false;
            }

            // busca a Sala de Estudos associado a esse canal
            // se não for encontrado, responde perguntando qual sala de estudos ele quer associar a este canal.
            let sala = this.salaManager.fromDiscordChannel(message.channel.id);

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
}