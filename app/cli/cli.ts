import yargs, {Arguments} from "yargs";
import {AppRootContainer} from "../AppRootContainer";
import {CliContainer} from "./CliContainer";
import {DiscordContainer} from "../discord/DiscordContainer";

console.log(JSON.stringify(process.argv));

let rootContainer = new AppRootContainer();
let discordContainer = new DiscordContainer(rootContainer);
let cliContainer = new CliContainer(discordContainer, rootContainer);

let parser = yargs
    .command(cliContainer.salaCmd)
    .command(cliContainer.discordCmd)
    .version("0.0.1")
    .help()
    .fail(function (msg, err, yargs) {
        if (err) throw err // preserve stack
        console.error('You broke it!')
        console.error(msg)
        console.error('You should be doing', yargs.help())
    })
    .showHelpOnFail(true, "falhou mano.")
    .demandCommand()
    .exitProcess(false);

let parseCallback = function (err: Error | undefined, argv: Arguments<{}>|Promise<Arguments<{}>>, output: string) {
    console.log("---------------------------------");
    console.log("parse callback - begin");
    console.log(err);
    console.log(output);
    console.log(JSON.stringify(argv));
    console.log("parse callback - end");
};

//let args = parser.parseSync(process.argv.slice(1), {modo: "cli"}, parseCallback);
//let args = parser.parseAsync(["asda", "discord", "lst"], {modo: "cli"}, parseCallback);
//args.then(a=> {   console.log("=-=-=-=-=-=-", a); });
//console.log(JSON.stringify(args));

(async() => {
    let args2 = await parser.parseAsync(["discord","getSala","-b","12312","-b"], {channel: "bot"}, parseCallback);
    console.log("=+=+=+=+=+=+", args2);
})();


console.log("fim.");

