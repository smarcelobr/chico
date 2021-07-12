import {Entidade, Estudo, EstudoSintese} from "../domain/Entities";
import * as fs from "fs";
import {FileUtils} from "../util/FileUtils";
import {IEstudosDAO} from "../domain/Repositories";
import path from "path";

export class EstudosJsonDAO implements IEstudosDAO {
    private readonly __dirBase;

    constructor(_dirBase: string) {
        this.__dirBase = _dirBase;
    }

    getAllEstudos(): Promise<EstudoSintese[]> {
        let promise = new Promise<EstudoSintese[]>((resolve, reject) => {
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
                ).catch((razao=>reject("deu ruim\n"+razao)));
            });
        });
        return promise;
    }

    obterEstudoPorId(estudoId: string): Promise<Estudo|undefined> {
        return this.carregaEstudoSinteseFromJson(estudoId);
    }

    private carregaEstudoSinteseFromJson<T extends Entidade>(file: string): Promise<T|undefined> {
        let promise = new Promise<T | undefined>((resolve, reject) => {
            let estudo:T|undefined = undefined;
            FileUtils.readFileAsync(path.join(this.__dirBase,file)) // Use the function we just wrote
                .then(function (res) {
                    estudo = JSON.parse(res);
                    if (estudo) {
                        estudo.id = file;
                        resolve(estudo);
                    } else {
                        reject("Falha no parse de `"+file+"`");
                    }
                }).catch((razao)=>reject(razao));
        });
        return promise;
    }



}