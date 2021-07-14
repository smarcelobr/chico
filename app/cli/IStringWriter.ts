export enum EmojisEnum {
    smile = ':smile:',
    thumbsup = ':thumbsup:',
    thumbsdown = ':thumbsdown:'
}

export interface IStringWriter {
    /**
     * Envia uma mensagem no canal desvinculada a mensagem do comando.
     *
     * @param msg conteúdo a ser enviado
     * @return id da mensagem enviada
     */
    send: (msg: string) => Promise<string>;

    /**
     * Responde a mensagem do comando e retorna o identificador da resposta.
     * @param msg conteúdo a ser enviado
     * @return id da mensagem enviada
     */
    reply: (msg: string) => Promise<string>;

    /**
     * Reage à mensagem no canal
     *
     * @param emoji Emoji a ser enviado
     * @return id da mensagem que recebeu o react
     */
    reage: (msg: EmojisEnum) => Promise<string>;


}