//import {Constants} from "discord.js";

console.log('Aplicação iniciada!');

/*
const PorterStemmerPt = require('./node_modules/natural/lib/natural/stemmers/porter_stemmer_pt');
var bayesClassifier = new natural.BayesClassifier(PorterStemmerPt);

// carrega a classificacao natural
bayesClassifier.load('dayAndNightClassifier.json', null, (err, classifier) => {
	if (err) {
		throw new Exception(err);
	}
	console.log(classifier);
});
*/
const Discord = require('discord.js');
const config = require('./conf/config.json');

const bot = new Discord.Client();

bot.on("debug", (msg) => {
	console.log('DEBUG '+msg);
} );

bot.once("ready", () => {
	console.log('Chico BOT está pronto para ser usado.');
});

bot.on("message", (message) => {
	const content = message.content;

	console.log(content);

	var chico_trigger = /^\s*Chico\W/i;

	if (chico_trigger.test(content)) {
		/* indica que o Chico deve reagir de alguma forma a essa mensagem
		   Dependendo do que virá a seguir.
		 */

		message.reply('Eu num intendo nada desses assunto di ciência!');
	}

});

console.log('Login...');
bot.login(config.token)
  .then( () => {
	    console.log('Bot Logado!');
	  }) 
  .catch((err) => { 
	  console.log('deu erro no login. :(');
	  console.log(err) 
	});

