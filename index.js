console.log('Applicacao iniciada!');

const Discord = require('discord.js');

/*const discord = new Discord(738863390167924808, Discord.CreateFlags.Default)

function LogProblemsFunction(level, message)
{
  Console.WriteLine("Discord:{0} - {1}", level, message);
}

discord.SetLogHook(Discord.LogLevel.Debug, LogProblemsFunction);
*/
const token = 'NzM4ODYzMzkwMTY3OTI0ODA4.XySGJw._XCaWDOjfbmghUPxwoZFbXRdFbI';

const bot = new Discord.Client();

bot.on('ready', () => {
	console.log('Chico BOT está pronto para ser usado.');
});

console.log('Login...')
bot.login(token)
  .then( () => {
	    console.log('Bot Logado!');
	  }) 
  .catch((err) => { 
	  console.log('deu erro no login. :(')
	  console.log(err) 
	});

