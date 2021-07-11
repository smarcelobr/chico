import {Snowflake, User} from 'discord.js';

type OpcaoId = number;

interface Opcao {
    id: OpcaoId;
    content: string;
}

interface Questao {
    pergunta: string;
    opcoes: Opcao;
    resposta: OpcaoId;
}

interface Materia {
    id: number;
    nome: string;
}

export class EstudoSintese {
    id: string;
    nome: string;

    constructor(id: string, nome: string) {
        this.id = id;
        this.nome = nome;
    }
}

export interface Estudo {
    materia: Materia;
    questoes: Questao[];
}

