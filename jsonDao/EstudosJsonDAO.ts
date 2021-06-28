import {EstudoSintese} from "../domain/Entities";
import * as fs from "fs";
import {FileUtils} from "./FileUtils";
import {IEstudosDAO} from "../domain/Repositories";

export class EstudosJsonDAO implements IEstudosDAO {
    private __dirBase = "D:\\smarc\\Projetos\\smarcelobr\\chico\\dados\\estudos";


    getAllEstudos(): Promise<EstudoSintese[]> {
        let promise = new Promise<EstudoSintese[]>(resolve => {
            fs.readdir(this.__dirBase, (err, files)=>{
                let carregaPromises:Array<Promise<EstudoSintese|undefined>> = new Array(files.length);
                files.forEach(file => {
                    carregaPromises.push(
                        this.carregaEstudoSinteseFromJson(file)
                    );
                });
                Promise.all(carregaPromises).then((estudos)=> {
                    // usando "User-Defined Type Guards" para transformar para array<EstudoSintese>
                    let filter:EstudoSintese[] = estudos.filter((estudo): estudo is EstudoSintese => !!estudo);
                    resolve(filter);
                    }
                );
            });
        });
        return promise;
    }

    private carregaEstudoSinteseFromJson(file: string): Promise<EstudoSintese | undefined> {
        let promise = new Promise<EstudoSintese | undefined>(resolve => {
            let estudo:EstudoSintese|undefined = undefined;
            FileUtils.readFileAsync(file) // Use the function we just wrote
                .then(function (res) {
                    estudo = JSON.parse(res);
                    resolve(estudo);
                });
        });
        return promise;
    }


}