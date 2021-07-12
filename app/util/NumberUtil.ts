/**
 * Várias funções úteis para lidar com números.
 */
export class NumberUtil {

    /**
     * Número aleatório inteiro entre min (incluido) e max (incluído).
     * @param min número minimo a ser retornado (incluído)
     * @param max número máximo a ser retornado (excluído)
     */
    static randomInteger(min: number, max:number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Número aleatório qualquer (não inteiro) entre min (incluido) e max (excluido).
     * @param min número minimo a ser retornado (incluído)
     * @param max número máximo a ser retornado (excluído)
     */
    static randomNumber(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }
}
