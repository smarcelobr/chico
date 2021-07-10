import yargs, {Arguments} from "yargs";
import {AppRootContainer} from "../AppRootContainer";
import {CliContainer} from "./CliContainer";

console.log(JSON.stringify(process.argv));

let rootContainer = new AppRootContainer();
let cliContainer = new CliContainer(rootContainer);

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
let args = parser.parseSync(["asda", "discord", "lst"], {modo: "cli"}, parseCallback);
//console.log(JSON.stringify(args));
console.log("=============");
let args2 = parser
    .parseSync(["discord","getSala","-b","12312","-b"], {channel: "bot"}, parseCallback);
//console.log(JSON.stringify(args2));

console.log("fim.");

/*
interface Arguments {
    [x: string]: unknown;
    a: boolean;
    b: string;
    c: number | undefined;
    d: (string | number)[] | undefined;
    e: number;
    f: string | undefined;
}

interface Arguments2 {
    a: boolean;
    i: string;
    y: number | undefined;
}



let args:Arguments2 = yargs
    .command('lyr', 'Tells whether an year is leap year or not', {
        year: {
            description: 'the year to check for',
            alias: 's',
            type: 'number',
        }
    },
        function (argv) {
            console.log("lyr executado!");
            console.log(argv.year);
        })
    .options({
a: {type: "boolean", default: false},
    y: {type: "number", default: 2021},
    i: {type: "string", demandOption: true}
}).parse("-i ttt -s 2020") as Arguments2;

/!*
    .option('input', {
        alias: 'i',
        demand: true
    })
    .option('year', {
        alias: 'y',
        description: "Year number",
        demand: true
    }).parse("-i ttt -y 2020");
*!/

console.log(JSON.stringify(args));

console.log(args.a);
console.log(args.y);
console.log(args.i);

*/
