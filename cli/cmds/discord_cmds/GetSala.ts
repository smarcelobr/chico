import {Arguments, Argv, CommandModule} from "yargs";

interface GetSalaArgs {
    channel: string
}

export class GetSala implements CommandModule<{},GetSalaArgs> {

    get describe(): string | false {
        return "Mostra a Sala que está associada a esse canal do discord.";
    }

    get command(): ReadonlyArray<string> | string {
        return "getSala";
    }

    get aliases(): ReadonlyArray<string> | string {
        return "gs";
    }

    handler(args: Arguments<GetSalaArgs>): void {
        if (args.channel) {
            console.log("**********discord getSala!**********");
            console.log("Canal:",args.channel);
        } else {
            console.log("***(FAIL)*discord getSala!**********");
        }
    }

    builder(yargs: Argv<{}>): Argv<GetSalaArgs> {
        return yargs
            .version(false)
            .option('channel', {
                type: 'string',
                alias: 'c',
                describe: 'Id do canal no discord',
                demandOption: "Especifique o ID do canal do discord para consulta."
            });
    }

}

