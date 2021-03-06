import yargs, {Arguments, Argv} from "yargs";
import {AppRootContainer} from "../AppRootContainer";
import {CliContainer} from "./CliContainer";
import {DiscordConversation} from "../discord/DiscordConversation";
import {ConsoleWriter} from "./ConsoleWriter";
import {IStringWriter} from "./IStringWriter";

let rootContainer = new AppRootContainer();

function getParser(strWriter: IStringWriter): Argv<{}> {
    let cliContainer = new CliContainer(strWriter, rootContainer.estudosDAO);
    let discordConversation = new DiscordConversation(strWriter, rootContainer.contextManager, rootContainer.estudosDAO);

    return yargs
        .command(cliContainer.salaCmd)
        .command(discordConversation.discordCmdModule)
        .version("0.0.1")
        .help()
        .fail(async function (msg, err, pYargs) {
            if (err) throw err; // preserve stack
            await consoleWriter1.reply('*You broke it!*\n'+msg+'\nYou should be doing '+pYargs.help());
        })
        .showHelpOnFail(true, "falhou mano.")
        .demandCommand()
        .exitProcess(false)
        .strict(true);
}

let parseCallback = function (err: Error | undefined, argv: Arguments|Promise<Arguments>, output: string) {
    if (err) {
        console.error(err);
    }
    if (output) {
        console.info(output);
    }
};

let consoleWriter1 = new ConsoleWriter("CMD1");
let consoleWriter2 = new ConsoleWriter("CMD2");

(async() => {
    let args = await getParser(consoleWriter1)
        .parseAsync(["asda", "discord", "lst"], {modo: "cli"}, parseCallback);
    console.log("=-=-=-=-=-=-", args);

    let args2 = await getParser(consoleWriter2)
        .parseAsync(["discord","getSala","-c","12312"],
        {ctx: {modo:"bot"}},
        parseCallback);
    console.log("=+=+=+=+=+=+", args2);
})();

console.log("fim.");
