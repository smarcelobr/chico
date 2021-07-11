import yargs, {Arguments, Argv} from "yargs";
import {AppRootContainer} from "../AppRootContainer";
import {CliContainer} from "./CliContainer";
import {DiscordConversation, StringWriter} from "../discord/DiscordConversation";
import {ConsoleWriter} from "./ConsoleWriter";

let rootContainer = new AppRootContainer();
let cliContainer = new CliContainer(rootContainer);

function getParser(strWriter: StringWriter): Argv<{}> {
    let discordConversation = new DiscordConversation(rootContainer.contextManager, strWriter);

    return yargs
        .command(cliContainer.salaCmd)
        .command(discordConversation.discordCmdModule)
        .version("0.0.1")
        .help()
        .fail(async function (msg, err, pYargs) {
            if (err) throw err; // preserve stack
            await consoleWriter1.write('You broke it!');
            await consoleWriter1.write(msg);
            await consoleWriter1.write('You should be doing '+pYargs.help());
        })
        .showHelpOnFail(true, "falhou mano.")
        .demandCommand()
        .exitProcess(false)
        .strict(true);
}

let parseCallback = function (err: Error | undefined, argv: Arguments|Promise<Arguments>, output: string) {
    // console.log("---------------------------------");
    // console.log("parse callback - begin");
    // console.log(err);
    // console.log(output);
    // console.log(JSON.stringify(argv));
    console.log("parse callback - end");
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
