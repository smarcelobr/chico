import {Arguments, Argv, CommandModule} from "yargs";
import {IContextManager} from "../domain/ContextManager";

interface GetSalaArgs {
    channel: string
}

export class GetSala implements CommandModule<{},GetSalaArgs> {

    constructor(private _contextManager: IContextManager) {

    }

    get describe(): string | false {
        return "Mostra a Sala que está associada a esse canal do discord.";
    }

    get command(): ReadonlyArray<string> | string {
        return "getSala";
    }

    get aliases(): ReadonlyArray<string> | string {
        return "gs";
    }

    get handler() {
        return async (args: Arguments<GetSalaArgs>) => {
            console.log("**********discord getSala!**********");
            if (args.channel) {
                console.log("Canal:",args.channel);
                let ctx = await this._contextManager.getChannelContext(args.channel);
                if (ctx.sala) {
                    console.log("Sala:",ctx.sala);
                } else {
                    console.log("Sem Sala...");
                }
            } else {
                console.log("Sem canal especifido.");
            }
        }
    }

    // async handler(args: Arguments<GetSalaArgs>): Promise<void> {
    //     console.log("**********discord getSala!**********");
    //     if (args.channel) {
    //         console.log("Canal:",args.channel);
    //         let ctx = await this._contextManager.getChannelContext(args.channel);
    //         if (ctx.sala) {
    //             console.log("Sala:",ctx.sala);
    //         } else {
    //             console.log("Sem Sala...");
    //         }
    //     } else {
    //         console.log("Sem canal especifido.");
    //     }
    // }

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

