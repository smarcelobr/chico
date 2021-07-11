import * as fs from "fs";

export class FileUtils {
    public static readFileAsync(filename: string): Promise<any> {
        return new Promise((resolve,reject) => {
            fs.readFile(filename,(err,result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }
}