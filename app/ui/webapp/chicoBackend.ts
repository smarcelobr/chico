import * as http from "http"
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs"
import * as path from "path";
import {EventEmitter} from "events";

interface ChicoBackendEvents {
    "recebido": () => void;
}

export interface IChicoBackend {
    run(): void;
}

export class ChicoBackend implements IChicoBackend {

    private server: http.Server;
    private __docbase = "D:\\smarc\\Projetos\\smarcelobr\\chico\\static"
    private __ContentTypeMap : { [fileExtension: string]: string } = {
        ".html": "text/html",
        ".txt": "text/plain",
        ".ico": "image/x-icon"
    };

    constructor(private _eventsEmitter: EventEmitter) {
        this.server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
            this.requestListener(req, res);
        });
    }

    run(): void {
        this.server.listen(8088);
    }

    requestListener(req: IncomingMessage, res: ServerResponse) {

        let resourceName:string;

        if (req.url==undefined || req.url=="/") {
            // página default
            resourceName = "/index.html";
        } else {
            resourceName = req.url;
        }

        let filepath:string = path.normalize( path.join(this.__docbase,resourceName));
        let statusCode:number = 200;
        let contentType: string;
        let contentData: Buffer;
        if (!filepath.startsWith(this.__docbase)) { // garante que a página está no local seguro
            statusCode = 403; // Forbidden
            filepath =  path.join(this.__docbase, "/forbidden.html");
        }

        if (req.method !== 'GET') {
            statusCode = 405; // Method not allowed
            filepath =  path.join(this.__docbase, "/methodNotAllowed.html");
        }

        console.log(filepath);

        fs.readFile(filepath, (err, data) => {
            if (err) {
                contentData = Buffer.from("página não encontrada.");
                statusCode = 404;
                contentType = 'text/plain';
            } else {
                contentData = data;
                contentType = this.__ContentTypeMap[path.extname(filepath)];
            }
            console.log(statusCode);
            res.writeHead(statusCode,{
                'Content-Length': Buffer.byteLength(contentData),
                'Content-Type': contentType
            });
            res.end(data);
            this._eventsEmitter.emit("recebido");
        });
    }

}

