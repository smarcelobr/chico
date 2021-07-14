import {Snowflake, User} from 'discord.js';

type OpcaoId = number;

export interface Entidade {
    id: string;
}

interface Opcao {
    id: OpcaoId;
    content: string;
}

export class Questao {
    pergunta: string;
    opcoes: Opcao[];
    resposta: OpcaoId;

    constructor(pergunta: string, opcoes: Opcao[], resposta: OpcaoId) {
        this.pergunta = pergunta;
        this.opcoes = opcoes;
        this.resposta = resposta;
    }
}

interface Materia {
    id: number;
    nome: string;
}

export class EstudoSintese implements Entidade {
    id: string;
    nome: string;

    constructor(id: string, nome: string) {
        this.id = id;
        this.nome = nome;
    }
}

export class Estudo implements Entidade {
    id: string;
    nome: string;
    materia: Materia;
    questoes: Questao[];

    constructor(id: string, nome: string, materia: Materia, questoes: Questao[]) {
        this.id = id;
        this.nome = nome;
        this.materia = materia;
        this.questoes = questoes;
    }

}

