import fs from 'node:fs';
import AbstractDirectory from './AbstractDirectory';
import type IFileResponse from '../responses/IFileResponse';

export default class FileService extends AbstractDirectory {
    constructor() { super(); }

    public override add(filePath: string): void {
        if (fs.existsSync(filePath)) throw new Error("File already exists !");
        fs.closeSync(fs.openSync(filePath, 'w'));
    }
    public override delete(url: string): void {
        if (!fs.existsSync(url)) throw new Error('File does not exists !');
        fs.unlinkSync(url);
    }
    public override get(path: string): IFileResponse {
        if (!fs.existsSync(path)) throw new Error('File does not exists !');
        const data = fs.readFileSync(path).toString();
        return { content: data };
    }
    public save(filePath: string, content: string): void {
        if (!fs.existsSync(filePath)) throw new Error('File does not exists !');
        fs.writeFileSync(filePath, content);
    }
    public override download(filePath: string) {
        if (!fs.existsSync(filePath)) throw new Error('File does not exists !');
        const content = fs.createReadStream(filePath);
        return content;
    }
}