import {Arguments, CommandModule} from "yargs";

export class LsSala implements CommandModule<{},{}> {

    get describe(): string | false {
        return "lista as salas ativas.";
    }

    get command(): ReadonlyArray<string> | string {
        return "list";
    }

    get aliases(): ReadonlyArray<string> | string {
        return ["ls","dir"];
    }

    handler(args: Arguments<{}>): void {
        console.log("**********sala ls!**********");
    }

}

