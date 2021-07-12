export interface IStringWriter {
    write: (msg: string) => Promise<void>;
}